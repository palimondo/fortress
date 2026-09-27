<!-- Conformance review of climb batch 3 (rung L a7ced6764, rung C c2b4e2c95, rung R 9782955b1, rung S 6bec1b004, rung M d28cf74d0, and rung P, which stopped, with its record a071fe409 and the follow-up notes its stop left), asked for by Pavol on 2026-09-27 in the form of the batch-5 review of the same day; written by a review worker reading only, on main at 595c5fdec, nothing built or run. -->

# Climb batch 3 against the specification, the team's built intent, the design record and the plan

## Method

The method is the batch-5 review's (`explorations/reviews/batch-5-conformance.md`, commit `fb701ff2e` on the branch `review-batch-5`), which is the method of `explorations/reviews/rung-conformance-1-4.md` with four global questions added. For each rung:
- `git show <hash>` first, then its `REPORT.md`, `record.md`, `JUDGE.md` and `SKEPTIC.md`, and the batch record (`explorations/coordinator/CLIMB-BATCH-3.md`, `explorations/compile-ladder/climb-batch-3/RECORD.md`, `JUDGE-review.md`, `REPAIR-review.md`);
- then the landed code as it stands on `main` at `595c5fdec`, after batches 3.5, 4, 5 and 6 landed on top;
- then the specification and the team's own code the rung touches.

Each rung is judged against three standards, kept apart:
1. the specification, `Specification/`, the July 2012 draft, as revised since by batch 5's rung S and batch 6's rung T;
2. the team's built intent: the library's own practice, the interpreter and the compiler as the team left them, their drafts and commits;
3. the design record outside the specification (`explorations/coordinator/map/design-intent-sources.md`).

Then the global questions:
- Does a choice made inside the rung, not by Pavol, conflict with a later phase of `explorations/coordinator/PLAN.md` (the checker at a true zero, the switch-over, microGPT's static types and the array design, unboxed arithmetic) or with a decision he took since?
- Is anything built twice, or built so that a later phase must undo it?
- Did the rung solve its problem the way the library already solves the same family?
- What should have reached Pavol and did not?

A structural fact first. Batch 3 ran on 2026-09-22, before most of what now governs it:
- route A, which keeps the exclusion rule and flattens the tower (`explorations/coordinator/POSITIONS.md:69`, 09-24);
- his weighing of the type group's late word over the early specification (`POSITIONS.md:58`, 09-23);
- answers 9 to 12 on overloading, `fill`, the count and unknown sizes (`POSITIONS.md:108-111`, 09-26).

Its manifest framed the checker's exclusion clause `checkP` as a checker defect the specification contradicts (`CLIMB-BATCH-3.md:79`). Rung P's stop showed it is the designers' rule, and route A kept it. So the questions here are mostly what later decisions did to what batch 3 left.

The rungs carried decisions Pavol took by name: row 329 for R (`POSITIONS.md:48`), row 321 for S (`:50`), the closure comment and the approved scalar block for C (`:44`), and "Finish" for L's count (`:57`). M carried none; it was separable by his rider, which he did not take. P carried a fork reserved to him (`CLIMB-BATCH-3.md:18`). The review judges only what a rung decided inside itself as the rung's.

Claims marked "by reading" were not run.

## The verdicts

- **Rung L, the five api defects: in the spirit.** The flattening replaced one of its five edits. Another has lost the gate it was promised.
- **Rung C, the four comments: in the spirit.** One comment names a shape that a later decision refuses, by reading.
- **Rung R, `round` half to even: in the spirit.** Its side effect on numerals near a tie is recorded and gated. The fork it left has moved under it.
- **Rung S, the default rendering: in the spirit.** Its one open case becomes every object at the switch-over, and the plan does not carry it.
- **Rung M, the analyzer memo: in the spirit.**
- **Rung P, stopped: the stop is in the spirit. The judge's ruling and what the stop left in the record are not.**

## Rung L, `a7ced6764`

### What landed

- Eleven `RangeInternals.fsi` declarations take `I extends Integral[\I\]` where the traits they instantiate require it (`Library/RangeInternals.fsi:309`, `:578-592`, `:612-616`).
- `String`'s duplicated `split`/`splitWithOffsets` pair declared once, abstract (`Library/FortressLibrary.fsi:2359-2360` today).
- `List.fsi`'s covariant redeclaration of `zip` deleted.
- `Condition.map` returns `Condition[\G\]` (`Library/FortressLibrary.fsi:852` today).
- `trait QQ … comprises { AnyIntegral, ... }` at the then `.fsi:373`. The count went 93 → 103, declared on Pavol's "Finish" (`POSITIONS.md:57`).

### Standard 1: the specification

- **The bounds.** A static argument must satisfy its parameter's bound (`Specification/basic/trait-parameters.tex:43-50`; rule W-Tapp, `Specification/appendices/calculi/basic/static.tex:229-246`). The four range traits require `Integral[\I\]`, so an unbounded or `AnyIntegral`-bounded argument is ill-formed.
- **The duplicated pair and `zip`.** An api method must be satisfied by the component (`Specification/basic/components/source-code.tex:372-384`, `:399-404`). The component's `trait String` defines neither method, so the api's pair must be abstract. `List.fss` has no `zip`, and the inherited `ZeroIndexed.zip` serves every call.
- **`Condition.map`.** An overriding declaration's return type must be a subtype of the overridden one's (`Specification/basic/traits.tex:562-563` today). `Generator[\G\]` is not a subtype of `SequentialGenerator[\G\]`; `Condition[\G\]` is.
- **`QQ`'s clause.** L corrected its own brief here. The brief asked for `comprises { AnyIntegral }`. The component's `QQ` also comprised the private `Ratio`, and an api may leave out a component-private type only by writing `...` (`source-code.tex:386-392`). L wrote `{ AnyIntegral, ... }` and measured the brief's form refused.

No finding against the specification.

### Standard 2: the team's built intent

Each choice follows the team's own text:
- the bound is the one the api's own factories already carry (`RangeInternals.fsi:172`, `:327`, `:570`);
- the abstract pair is Andrew Black's form (`d3bf13292`, 2008-11-14), which completed the older documented pair;
- `Condition[\G\]` is the component's type (`Library/FortressLibrary.fss:1228` at the time) and the compiler prelude's (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:663`);
- the listed-plus-ellipsis form is the team's own test shape (`ProjectFortress/test_library/Compiled3.q.fsi:13`, `compiler_tests/Compiled10.pAPI.fsi:12`).

L chose the narrow set of eleven declarations the checker names, not every `AnyIntegral` bound in the file, as the brief asked. The component's twins and the public range factories keep `AnyIntegral` (row 358).

### Standard 3: the design record

No design source outside the specification speaks to these five. They keep the api a true contract for its component. That is Pavol's rule that the library's practice is the standard (`POSITIONS.md:37`).

### The global questions

- **The flattening replaced the `QQ` edit, and kept L's reasoning.**
  - Batch 6 made `QQ` a sibling: `excludes { RR64, AnyIntegral } comprises { ... }` in the api (`Library/FortressLibrary.fsi:382-385`), `comprises { Ratio }` in the component (`Library/FortressLibrary.fss:544-547`).
  - That is L's rule, `...` for a component-private type, applied to the flat shape.
  - The cost was one decision put to Pavol ("Finish"), now moot. It follows from the order the plan chose, so there is no fault in it.
  - `FACTS.md:58` still describes `QQ`'s clause as L left it. That line is stale.
- **`Condition.map`'s promised gate will not come.**
  - The judge kept the edit ungated and named its gate: "the count stage on whatever tree lands a relaxation from P's fork" (`JUDGE-review.md` § 3; `FACTS.md:58`).
  - Route A lands no relaxation (`POSITIONS.md:69`).
  - The `FortressLibrary` api still stops at its hierarchy errors before the overloading checker runs (`explorations/perf-probes/prelude/switch-over-distance.md:68`, `:200`). So no stage sees the error today, by reading.
  - The edit is right on its own grounds (standard 1). Only its gate is void.
- **The other four edits** sit unchanged on the flat tower.
- **Row 354** (the checker refuses any api trait that extends a trait whose `comprises` has `...`) no longer touches `FortressLibrary`: nothing there extends `QQ` now. It stays gated by the team's `XXX3q` and `XXX10p`.
- **Built twice.** No. The bounds are half done: the component's helpers and the public factories keep `AnyIntegral` (row 358). W1's export row already counts that kind of api-component difference (`switch-over-distance.md:94`), so it is inside the measured distance.
- **The library's way.** Yes, every edit.
- **What reached Pavol.** The count (`POSITIONS.md:57`). The judge's "for Pavol" note on `Condition.map` asked the coordinator to put it beside P's fork (`JUDGE-review.md:44`, `:123`). Whether he was told is not on record.

### Verdict: in the spirit

Each fix is argued from the specification and follows the component, the compiler prelude or the team's own test shape. L corrected its brief where the specification required it. What is left is two record lines: the stale `FACTS.md:58` and a gate that route A voided.

## Rung C, `c2b4e2c95`

### What landed

Comment text only, 31 lines in the two library files:
- The closure's `NOT YET` note, in each file's own form (`Library/FortressLibrary.fss:642`, `.fsi:429` today).
- Why `Array3` excludes `AnyAdditiveGroup` (`.fss:2769-2774`, `.fsi:1723-1728`).
- The scalar block's header: the eight return the unsized `Array[\T,I\]`, and sized arrays under a compiler "need per-shape declarations beside these" (`.fss:4568-4573`, `.fsi:2572-2577`).
- The reversed `-` (`.fss:4577-4579`, `.fsi:2581-2583`).

At the gather it added `tests/XXXArrayLiteralArgRungC.fss` (row 49's argument-position form) and one re-anchored message. It opened row 359.

### Standard 1: the specification

A comment is whitespace to the lexer (`Specification/basic/lexical-structure.tex:700-764`). The only way it can change a program is through its delimiters. C checked them mechanically (`explorations/compile-ladder/rung-library-comments/comment-only-check.py`).

The closure note says what the grammar lacks: `comprises` takes trait types, not a where clause (`Specification/basic/traits.tex:76-88`).

C found that the "neutral" claim is not quite true. A comment after a declaration that ends in an expression widens that declaration's span and its derived name (row 359; `FACTS.md:23`). C mapped positions back and showed no answer changed.

### Standard 2: the team's built intent

- The notes copy each file's own `NOT YET` form: `(** \vspace{-4ex} NOT YET: … *)` in the component (`.fss:1395`, `:1472`, `:1687`), and `(** not yet: ``…'' *)` in the api (`.fsi:880`, `:1125`).
- The note sits after the one-line trait rather than inside it, because putting it inside would change a code line. The report argues this deviation.
- The honest clause is spelled without braces, as the team spells its single-type notes.

### Standard 3: the design record

The July 2012 wind-down post names "conditional inheritance via where clauses" among the three things the team wished it had explored (`design-intent-sources.md:57`). The library's `NOT YET` notes are that wish in its own text, and C added the fourth in the same words.

### The global questions

- **The flattening kept all four comments, and three are still true.**
  - The closure note fits the flat `AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` (`.fsi:428-429`).
  - The `Array3` note holds, since `Vector` and `Matrix` are still additive groups (`.fsi:1527`, `:1645`).
  - The reversed-`-` note holds.
- **The scalar-block header prescribes a shape that answer 9 refuses, by reading.**
  - The sentence "sized arrays under a compiler need per-shape declarations beside these" is the default Pavol approved as landed on 09-21: 3b-A, "four `Vector` and four `Matrix` declarations … added beside the generic eight — literally the precedent's own shape" (`explorations/coordinator/postmortem-2026-09-19/library-findings-explained.md:272-284`; `POSITIONS.md:44`).
  - Answer 9 (09-26) keeps one rule from the overload sentence. When one generic declaration is more specific than another, the two declare the same number and kinds of their own static parameters, position by position (`POSITIONS.md:108`; `explorations/reviews/overloading-judgement.md:14`, `:85`).
  - A per-shape `+` on `Vector[\T,n\]` has `[\T, nat n\]`, and the generic arm has `[\T, I\]`: the kinds differ at the second position. On `Matrix[\T,r,c\]` the counts differ. Each is more specific than the generic arm, so the rule refuses both.
  - The team's padding device would not rescue them. The library pads every `DOT` to `[\T, nat n, nat m, nat p\]` (`.fsi:1574-1589`), but padding cannot turn a type parameter into a size. Padding the generic arm with sizes instead leaves sizes that no call can fix, which answer 12 refuses at the call (`POSITIONS.md:110`).
  - The library's own way to keep a shape through an elementwise operation is a method redeclared in each leaf array trait: `map`, `copy`, `replica`, and answer 10's `fill` (`POSITIONS.md:109`). That meets neither rule.
  - C wrote Pavol's default faithfully. The conflict is between two of his decisions, and C's comment is the text phase 5 will read.
- **The block's bodies no longer type-check against their bound, by reading.** The bodies call `+`, `-`, `MIN` and `MAX` on `T extends Number`, and the flat `Number` has none of them (`Library/FortressLibrary.fss:352-366`). Walk dispatches on the value, so nothing runs differently. The component check in phase 3 will report it. This belongs to the block (`02d09a39f`), not to C.
- **Built twice.** No.
- **The library's way.** Yes, for the notes.
- **What reached Pavol.** Nothing needed to, at the time.

### Verdict: in the spirit

It is the team's own voice in the team's own form, and the rung showed the edit was neutral at the level where it was not obviously so. One sentence now names an answer that a later decision closes. The fix is to the words (below), and the question goes to the array design.

## Rung R, `9782955b1`

### What landed

- One token in each float `round` native: `Math.round` → `(long) Math.rint` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Float.java:384`, `RR32.java:326`).
- The gated test `tests/RoundHalfEvenRungR.fss` (21 assertions).
- Two expected failures: `tests/XXXRoundNearTieNumeral.fss` (row 360) and `tests/XXXRadixTenPointNumeral.fss` (row 361, placed at the gather).
- Rows 360-362 opened.

### Standard 1: the specification

- For a numeral with a radix point, the specification speaks. It is a rational (`Specification/basic/expressions/literals.tex:162-163`), and a rational rounds half to even (`Specification/basic-lib/numbers.tex:445-447` today).
- For a `Float` or `RR32` value the prose is silent. `numbers.tex` has one section, "Rational Numbers" (`:16`). The ground there is Pavol's decision (`POSITIONS.md:48`).
- R's report states that split plainly.

### Standard 2: the team's built intent

- Steele's rational body rounds half to even (`Library/FortressLibrary.fss:621` today; `dc41d5000`, 2008-07-21), pinned by `tests/RationalTest.fss`.
- The compiled path's `simpleDoubleArith.doubleRound` has been `(long) Math.rint` since batch 1 (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:132-134`).
- The interpreter's `Math.round` came three months after Steele's body, with no reason given (`explorations/compile-ladder/rung-rr64-functions/round-history.md`).
- R made the interpreter agree with the team's own two other bodies.

### Standard 3: the design record

IEEE 754's default is round half to even. Pavol's rule of 09-22 is to correct the JVM's defaults where precision matters, "as the designers did with rounding" (`POSITIONS.md:52`).

### The global questions

- **Row 330** (`floor`/`ceiling`/`round`/`truncate` to the unbounded ℤ, after the switch-over): R's assertions compare with integer literals, so they survive that change. R did not change what NaN or an infinity gives: `(long) Math.rint` and `Math.round` agree there.
- **The switch-over.** `Float$Round` has a compiled twin, `doubleRound`. `RR32$Round` has none. It is one of phase 4's unbound natives (`PLAN.md:61`), and R adds nothing to that list.
- **Numerals near a tie.**
  - R moved four `walk` answers away from the specification: `2.50000000000000001` 3 → 2, `0.50000000000000001` 1 → 0, `2.5 + 0.00000000000000001` 3 → 2, and a binary near tie 3 → 2. It moved one toward it.
  - This is recorded (`explorations/compile-ladder/rung-round-half-even/REPORT.md:167-170`; row 360), and the specification's answers are gated as an expected failure.
  - No rule applied to the double can answer them all, since three of these numerals share the double `2.5`. The row is parked (`PLAN.md:121`).
- **Row 360's fork has moved under it.**
  - Its option (b) rests on "the interpreter has no coercion mechanism" and on ℚ being absent from the compiled prelude (`explorations/fortress-gap-ledger.md:371`).
  - Since then walk coerces (batch 4, `b628871a2`), `QQ` is a sibling of `RR64` (batch 6, `d846e3644`), and ℚ reaches the compiled path at the switch-over.
  - The fork's options must be derived again before it is put to him.
- **Stale citations in its tests.**
  - Batch 6's rung T moved the rounding rule from `numbers.tex:470-472` to `:445-447`.
  - The 24 assertion messages of R's three test files still cite `:470-472`, which is now the hyperfloor text. Rows 329, 360 and 361 cite the same lines.
- **Built twice.** No.
- **The library's way.** Yes. It is the compiled path's existing call.

### Verdict: in the spirit

It is the team's rule, now in all three places the team wrote rounding. The side effect is honest and gated. What is left is record work: the fork's premises and the moved line numbers.

## Rung S, `6bec1b004`

### What landed

- `trait Object`'s compiled default `asString` becomes `jDefaultAsString(self)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355`), with its import (`:287`).
- The native `stringOps.defaultAsString`: a value whose Java class declares its own `toString` keeps it, and every other value renders its Fortress type name through `typeName` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:49-86`).
- The gated test `compiler_tests/DefaultRenderRungS` (18 assertions).
- The expected-failure pair `XXXFortToStringRungS` for row 321's open case, placed at the gather.
- Rows 363-369 opened. Rows 374-377 were opened at the landing.

### Standard 1: the specification

Every object has `Any`'s methods (`Specification/basic-lib/objects.tex:19-22`). `toString` returns a string that "textually represents" the object (`:124-126` today). The stack overflow violated that.

The spelling of a type name is not specified. It is Pavol's decision: the bare name, walk's spelling (`POSITIONS.md:50`).

### Standard 2: the team's built intent

- **The spelling.** It is walk's, byte for byte, down to tuple and arrow arguments (`explorations/compile-ladder/rung-default-rendering/REPORT.md`, "Differentials").
- **The builtin names.** The native drops the leading `F` of a run-time value class. That inverts the team's own naming rule, `"com/sun/fortress/compiler/runtimeValues/F" + type` (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:407-409`, the table at `:541-555`).
- **Interop.** `FValue.toString` stays `asString().toString()`, so a Java caller sees what `println` shows. This is the batch record's rule.
- **The frozen prelude.** It is respected: a body and an import, no declaration (`CLIMB-BATCH-3.md:166`).
  - The reflection device `hasOwnToString` exists because two prelude traits (`RR32`, `StringVector`) have no `asString`, and none may be added (`REPORT.md:54`).
  - That is a local device forced by the freeze, and it is argued.

### Standard 3: the design record

The default-rendering judgement and Pavol's row-27 decision. The team's own `// this can't be right! DRC` sat on the old body.

### The global questions

- **Row 321's open case becomes every object at the switch-over, by reading.**
  - The one library's `trait Object` declares `getter toString(): String = self.asString (* deprecated *)` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:51`, `.fsi:38`). `toString` is the specification's own name for the method (`objects.tex:47`, `:122`).
  - Every object inherits that getter.
  - S's second skeptic measured that an object which "declares or inherits" a zero-argument Fortress `toString` still overflows under `defaultAsString`: `hasOwnToString` answers true, and the call re-enters the default (`REPORT.md:135`, item 13).
  - S's report says it outright: the repair "is a precondition of adopting the interpreter's `trait Object` … at the switch-over" (`REPORT.md:175`; ledger row 321, `fortress-gap-ledger.md:332`).
  - So if the switch-over binds walk's `ObjectPrims$ToString` (`FortressBuiltin.fss:40-41`) to `defaultAsString`, the helper the prelude binds today, every object with no `asString` overflows when printed, and `DefaultRenderRungS` goes red.
  - The same report names the other helper, `typeName`, as "the compiled counterpart that declaration will need" (`REPORT.md:70`). It calls no `toString`.
  - Every value type in the one library declares its own `asString` (`FortressBuiltin.fss`: `Float` :54, `FloatLiteral` :194, `RR32` :203, `Int` :369, `Long` :378, `NN32` :387, `UnsignedLong` :459, `IntLiteral` :470, `BigNum` :537, `Boolean` :547, `Char` :583). So the reflection half is not needed there.
  - Phase 4 lists natives by count only (`PLAN.md:61`). Neither this choice nor the precondition is in it.
- **`asDebugString` at the switch-over.**
  - The one library's article form (`FortressBuiltin.fss:42-47`) reaches the compiled path.
  - `not_working_library_tests/Comparison1.fss`, a file the ladder holds at `pass`, asserts the bare form (`CLIMB-BATCH-3.md:138`; row 363).
  - The switch-over's respelling list (`PLAN.md:62`) does not name it.
- **Built twice.** No. `typeName` is kept pure for row 363's future `ilkName`, which is the right foresight.
- **Unboxing.** Nothing.
- **What reached Pavol.** Rows 374-377 went to the ledger at the landing. The switch-over precondition stopped at row 321 and never reached the plan.

### Verdict: in the spirit

It is his decision, in walk's exact spelling, built from the team's naming rule and keeping the team's interop rule. What is not in the spirit is where its one open case went: it sits in a row, not in the phase it will break.

## Rung M, `d28cf74d0`

### What landed

`TypeAnalyzer.parents` and `excludesClause` are memoized on `TraitTable` behind the switch `fortress.analyzer.clauses.cache`, default on (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:81-97`). The two `def` lines of `TypeAnalyzer.scala` changed. The count table stayed identical line for line, and the count stage now takes 9.5-12.4 s where it took 22.3-22.6 s (`FACTS.md:60`).

### Standard 1: the specification

The specification says nothing about how a checker computes the relations. The memo computes the same extends and excludes relations from the declarations and the type alone.

### Standard 2: the team's built intent

- **The team's memo shape.** Switch, `get`, compute, store, one switch per memo. The tree already has ten memos of this shape (`TypeAnalyzer.scala:63-69` and the others the report lists).
- **Where it lives.** On the object whose lifetime is the check of one unit, because `extend` makes a fresh analyzer at every generic declaration. This is the placement the prototype's author asked for.
- **The key.** It is exactly the function's inputs. That is unlike the team's `validOverloadingMemo`, whose key omits inputs and hides 27-35 errors (`FACTS.md:41`).
- **Soundness.** It is argued from immutability: `TraitTable` has no mutator, and every "change" of the table constructs a new one.

### Standard 3: the design record

This serves Pavol's rule that development-loop performance is first-class (`POSITIONS.md:27`).

### The global questions

- **Sizes.** Since rungs N and Z, keys can carry sizes. `TraitType.equals` covers the arguments, so nothing changes.
- **Phase 3 and the switch-over.** Both check the whole one library, and this halves each run. No conflict with any phase.
- **Built twice.** No.
- **The library's way.** Yes. It is the checker's own idiom.

### Verdict: in the spirit

## Rung P, stopped (`a071fe409`, the record; the branch `wip/rung-exclusion-relax`)

### What its stop left

- **In the tree.** Rung P's `REPORT.md`, `record.md`, `JUDGE.md` and eighteen probes under `explorations/compile-ladder/rung-exclusion-relax/` (`RECORD.md:94`).
- **On the branch only.** Its expected-failure test `XXXExclusionRelaxRungP`.
- **The coordinator's follow-ups.** The `FACTS.md:42` line (`7f9ad71e6`), the ground note `explorations/reviews/multiple-instantiation-exclusion.md` (`b0789fc43`), and the probes and notes under `explorations/reviews/mie-probes/` (`5c1defe40`, `a2e0458c1`, `e1a4461fb`). Then the design brief (`24f9d3b0a`) and route A (`POSITIONS.md:69`).

### Standard 1: the specification

The worker did not weaken soundness to satisfy the text as it stood. Relaxing `checkP` in any placement lets a six-line program type-check and die with `IncompatibleClassChangeError` (`probes/ProbeMIEPick.fss`; `probes/probe-matrix.txt:67`, `:89`, `:111`).

The specification then allowed double membership. Batch 5's rung S has since revised it to instantiation exclusion (`Specification/basic/types-vals-vars.tex:218-237`). The stop respects the text as it was and as it is.

### Standard 2: the team's built intent

The worker named the rule and its reliance correctly:
- the type group's "multiple instantiation exclusion" (`Papers/Types/exclusion.tick:141-152`; Naden 2012, `Papers/Types/journal/justificationOfRTR.tex:457-459`, `:496-497`);
- the return-type rule's reliance on it (`OverloadingOracle.scala:81-105`);
- the compiler prelude's commented-out `extends` clauses as the team staying inside it.

### Standard 3: the design record

Pavol's weighing of 09-23: the type group's late, implementation-informed word outweighs the early specification (`POSITIONS.md:58`). The worker's first option, keep the rule and flatten the tower as the compiler prelude did (`REPORT.md:44`), is that word.

### The judge's ruling took a decision that was Pavol's

- The judge struck "keep the rule" from the fork: "not a live candidate", "the library route re-asked" (`JUDGE.md:36`), and "Not recommended" (`:81`). It records the striking as one of its two decisions (`:85`).
- Two days later Pavol took exactly that option (`POSITIONS.md:69`).
- The judge's four candidates also dropped the library's own precedent, the compiler prelude's flattened tower, which the worker had named.
- The ground note put the option back as route A, with "The judge struck this route" beside it (`multiple-instantiation-exclusion.md:81-85`). The design brief answered the judge's reading of the library route (`explorations/reviews/exclusion-design-brief.md:76`). So the harm stopped before the decision.
- The failure is the one the protocol names: a fork put to him before the library's own way was checked, and a rule that blocks an option not answered with how the library gets around it (`explorations/protocol.md`, principle 2; `POSITIONS.md:72`).
- The judge's instructions ask for "the fork, the candidates, what each costs, and your recommendation" (`explorations/coordinator/climb-batch-workflow.js:740`). They do not say that no candidate may be struck.

### What the record still says

- **P's own files.** They carry the struck fork and recommendation (b), with nothing pointing at route A. `record.md:3` and the note at `JUDGE.md:3` say the text cites `XXXExclusionRelaxRungP` "as in the tree"; it is not in the tree.
  - Under route A and the revised specification, that test's program is refused by the specification too, so it must never land.
  - The brief said it is deleted with route A (`exclusion-design-brief.md:85`). The branch waits in the parked cleanup (`PLAN.md:127`).
- **`FACTS.md:42` still lists the three routes as open.**
  - It calls "keep the rule" "against the spec and the decided route".
  - It closes "Not settled: the size of the call-site dispatch change; the three defects not yet in the ledger". The change was sized at 43 lines (`explorations/reviews/mie-probes/scope-call-site-dispatch.md:5`).
  - It says `MieDispatchSub` "compiles under every route". Under the stock checker, which route A keeps, the program is refused with four hierarchy errors (`mie-probes/MieDispatchSub.compiled.txt:1-11`), because `Sub[\X\] extends Tag[\X\]` makes `Mixed` a double member.
- **Row 97.**
  - P's proposed note to row 97 was never folded (`RECORD.md:96`).
  - Row 97's first shape, `Array[\RR64,ZZ32\]` beside `Array[\RR64,(ZZ32,ZZ32)\]`, is two instantiations of one generic. Under instantiation exclusion as rung S states it, they exclude each other, so the pair is a valid overloading. Walk's refusal is then row 416's defect, not a design limit.
  - Row 97 still reads "design limit" (`fortress-gap-ledger.md:166`). It is the pair behind the APL program's workaround.

### Two compiled dispatch defects that stayed out of every list

The dispatch probes that followed P's stop found two defects that need no double membership (`scope-call-site-dispatch.md` § 4, `:63-67`; `dispatch-and-route-c.md:32-34`):
1. **A generic arm reached from a less specific declaration throws when its return type mentions its parameter.**
   - The cast after the call names the arm's own, unrewritten parameter (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1755-1762` today).
   - `ScopeAlpha2`, whose two arms name their parameters in different orders, links and throws on the stock checker (`mie-probes/scope/ScopeAlpha2.compiled.txt:1-6`).
2. **A `ZZ32` instantiation made at run time is spelled differently from the static one.** The run-time spelling is `fortress|CompilerBuiltin%ZZ32` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/RTHelpers.java:174-175`, `compiler/runtimeValues/RTTI.java:55`), and the static one is `…runtimeValues|FZZ32`.
   - `ScopeZZ32Sub` shows it on the stock checker: `grab[\X\](t: Tag[\X\])` beside `grab[\X\](t: Sub[\X\])`, with `IntSub extends Sub[\ZZ32\]`, called through `t: Tag[\ZZ32\]`.
   - It links, then throws `ClassCastException` (`mie-probes/scope/ScopeZZ32Sub.compiled.txt:1-6`).
   - The two arms have the same static parameters, so answer 9's positional rule accepts the pair, by reading. It is a legal program under the decided route that type-checks and dies.

The route-A brief priced them as "the two side defects stay" (`exclusion-design-brief.md:86`). Neither has a ledger row. Neither is in the plan, batch 6's manifest or the overloading judgement.
- The measured 43-line change fixes both inside template dispatchers. It does not fix them in non-template dispatchers or dotted methods (`scope-call-site-dispatch.md:65-67`).
- Whether the one library's overload sets reach them was not checked; W1 compiled and did not run.
- They sit beside batch 5's rows 417, 419 and 420 on the same path.

### Verdict: the stop in the spirit; the ruling and the record not

The worker found the designers' rule by name and the program that shows why it exists. Route A stands on that. The judge then struck the option Pavol later chose. The stop's follow-ups left two measured compiled-path defects in a FACTS line that still reads as if nothing was decided.

## Findings that need Pavol

Each has what it would take to fix.

1. **Two compiled dispatch defects found after rung P stopped are in no ledger row and no plan phase.**
   - One: a generic arm reached from a less specific declaration throws when its result names its parameter.
   - Two: a `ZZ32` instantiation made at run time is spelled differently from the static one.
   - `ScopeZZ32Sub` is legal under route A and answer 9, type-checks, and throws `ClassCastException`.
   - Fix:
     - Open two rows with `ScopeZZ32Sub` and `ScopeAlpha2` as expected-failure compile tests.
     - Name them in the switch-over's design beside batch 5's rows 417, 419 and 420.
     - Take the measured 43-line template change as a rung with a gate run. It fixes both inside templates only.
   - Cost: one small rung for the rows and tests, and one rung for the 43 lines. The non-template half is unmeasured.
2. **At the switch-over, every object with no `asString` of its own would overflow the stack when printed.**
   - The one library's `trait Object` declares a `toString` getter that every object inherits (`FortressBuiltin.fss:51`).
   - Rung S's own report calls its repair a precondition of the switch-over. The plan does not list it.
   - Fix: when the switch-over binds walk's `Object.asString`, bind it to `stringOps.typeName`, which calls no `toString`, as rung S's report says. Or land rung S's measured repair first. Then promote `XXXFortToStringRungS` to a plain test.
   - Cost: one line in phase 4's design, or one small rung before it.
3. **A library comment names an answer for the array design that answer 9 closes, by reading.**
   - The scalar block's header says sized arrays will need per-shape declarations beside the generic eight. That was your default of 09-21.
   - Answer 9's positional rule refuses those declarations, because their static parameters differ in kind or number from the generic arm's.
   - The library's own way to keep rank and size, a method redeclared in each leaf array trait as for `map` and `fill`, meets no such rule.
   - Default: reword the comment to state only the loss. Take the question into the array design with the rule as a constraint.
   - Cost: two comment lines in two library files (an original-tree edit, flagged), and one line in the array questions. Nothing now.
4. **A judge struck the option you later chose from a reserved fork.**
   - Rung P's judge removed "keep the rule" before the fork reached you. The coordinator's ground note put it back, and you chose it as route A.
   - The judge's instructions ask for candidates and a recommendation, and do not forbid striking one.
   - Fix: one sentence in the judge's stop instruction: list every candidate the worker named and the library's own way, recommend one, strike none.
   - Cost: a one-line change to `explorations/coordinator/climb-batch-workflow.js`. It is a script change, so it is yours.

## Smaller findings, for the record

- `FACTS.md:42` reads as if route A were undecided. It says `MieDispatchSub` compiles under every route, but the stock checker refuses it. Its "not settled" items are settled or sized. The line wants rewriting from route A and the two defects above.
- `FACTS.md:58` describes `QQ`'s clause as rung L left it, and names a gate for `Condition.map` that route A voided. The full measurement after batch 6 (`POSITIONS.md:111`) could run once with `.fsi:852` reverted on a copy. If the error shows, that run is its gate. If not, the line says why it stays ungated.
- Row 97's `Array` pair is row 416's walk defect under the revised rule, not a design limit. P's note was never folded.
- Row 360's options were written when walk had no coercion and `QQ` sat under `RR64`. They are to be derived again before the row is put to Pavol. He has not been told that rung R moved four near-tie answers away from the specification (row 360 records it).
- Batches 5 and 6 edited the specification without re-anchoring the tree's citations of it. The assertion messages of seven batch-3 gated tests cite passages that moved:
  - `traits.tex:525-531` → `:562-563` (`XXXFlatStringSplitRungL`);
  - `objects.tex:117-122`, `:144-158` and `:161-188` → about `:122-126`, `:176-178` and `:196-224` (`XXXFortToStringRungS`, `XXXTupleSevenRungS`, `XXXTupleSeparatorRungS`);
  - `numbers.tex:470-472` → `:445-447` in 24 messages (`RoundHalfEvenRungR`, `XXXRoundNearTieNumeral`, `XXXRadixTenPointNumeral`).
  - The ledger rows copy them.
  - A rung that edits the specification could grep the tree for citations of the file it moves.
- Rung P's `record.md` and `JUDGE.md` cite `XXXExclusionRelaxRungP` as in the tree, and nothing in P's directory points to route A. The test must not land from the branch.
- The scalar block's bodies call `+`, `-`, `MIN` and `MAX` on `T extends Number`, which the flat `Number` no longer declares. Walk is unaffected, but phase 3's component check will refuse them, by reading. The capability bounds Astra asked for on `Vector`/`Matrix` (`POSITIONS.md:101-104`) apply here too.
- `Comparison1.fss` in the ladder asserts the compiled bare `asDebugString`. At the switch-over it meets the one library's article form (row 363) and is not on phase 4's respelling list.
- The judge-review's items "for Pavol, out of the loop" (`JUDGE-review.md` § 6, with `REPAIR-review.md` § 1's replacement): whether he was told is not on record.

## What went right, globally

- P's stop worked as a stop should. The batch record had framed a designers' rule as a defect. The worker found the rule by name and the program that shows its purpose, and the judge held the stop. Route A stands on that evidence (`FACTS.md:42`; `POSITIONS.md:69`).
- L corrected its brief against the specification twice (the ellipsis, and the narrow set of bounds), and argued every choice from the component, the prelude or the team's tests. Four of its five edits sit unchanged on the flat tower.
- The judge's home-2 ruling closed a gap in the gather's own discipline. The repair then found that the judge's fix site for row 369 was wrong, and said so (`REPAIR-review.md` § 1).
- R recorded the side effect of Pavol's rule instead of letting a coincidence stand as correctness.
- M halved the checker's time with the checker's own idiom, and every later count stage has run on it.

## What I did not do

- Built nothing, ran no program, and edited no source, library, test, ledger or record file.
- Did not measure:
  - answer 9's positional rule on per-shape scalar declarations;
  - whether the switch-over reaches the two dispatch defects;
  - the one library's `trait Object` under the compiled default;
  - whether `Condition.map`'s error shows on today's tree.

  Each is stated as by reading.
- Did not review batches 3.5 to 6, except where they changed what batch 3 landed.
