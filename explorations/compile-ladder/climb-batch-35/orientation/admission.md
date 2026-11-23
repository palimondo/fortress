<!-- The orientation workflow's admission, update mode, for climb batch 35's landing (run 1 of CLIMB-BATCH-35.md) and the curator's decisions of the same day: which of the 26 FACTS and 4 POSITIONS entries change the fortress-repo skill's orientation (three changes: F-400 on `override`; P-165 with F-324 on the conversion into RR64; P-174 with P-173, P-40 and F-342 on a numeral coercion's body), where each other entry belongs, and the skill and quiz items outside the orientation that the landing bears on. -->

# Admission: climb batch 35

**Inputs**

- Base: `main` at `9322330fa8` (2026-11-23).
  - The orientation, `.claude/skills/fortress-repo/references/revival-changes.md`, was read whole as it stands (34,077 bytes). The core, `SKILL.md`, was read too.
  - The orientation was last changed at `91dde58f83` (09:43 UTC), before the batch's base `13f4fdea75`. Nothing under `.claude/` has changed since (`git diff --stat 91dde58f83 HEAD -- .claude/` prints nothing).
- The entries, each read with `explorations/coordinator/tools/facts-extract.sh`. What changed in each is a word diff of `FACTS.md` and `POSITIONS.md`, `13f4fdea75..HEAD`. The commits that changed each:
  - New: F-397 (rung R), F-398 (W), F-399 (S), F-400 (O), F-401 (A). Each came in its rung's commit and was put in the record's form at `2af3ec103d`.
  - Rewritten by the rungs (`RECORD.md`, "FACTS and POSITIONS entries"): F-363, F-369 and F-387 (W); F-372 (S); F-88, F-292 and F-315 (O); F-373 and F-351 (A).
  - Rewritten from the curator's decisions of today (`be43ddc647`, 14:33 UTC; `BOOT.md:15`):
    - P-165: the getter `asRR64` in place of `asFloat`.
    - P-174: a numeral coercion's body is a computation at compile time with no method invocation. Each of the four numbers converts where it stands, so the example is `Byte(v)`.
  - Brought in line with those decisions by the record-landing (`2af3ec103d`):
    - P-173 and P-40: the four numbers convert where they stand, a `ZZ` where nothing fixes a type.
    - F-323, F-324, F-342 and F-345: each names the tree's departure from the rewritten P-165 or P-174, "no row".
  - F-396: its sentence on row 1100 was replaced after the gate's repair (`b7b5b0c02b`, `2af3ec103d`).
  - Gate figures: F-53, F-240.
  - Citations re-anchored only: F-268, F-281, F-302, F-366, F-393. F-351 and F-315 were re-anchored too, beside their changes above.
- The landing:
  - `climb-batch-35/RECORD.md`: "Rows opened", "Rows closed", "FACTS and POSITIONS entries", "Left for the coordinator and the skill writer" and "Revival changes, for the skill writer".
  - `reviews/batch-35-review.md`, Part 3.
  - Ledger rows 1106 to 1109.
  - `HELD.md:10` and `BOOT.md:15`, for the decisions of today.
  - P-180 and `403a0e60cb`: the skill drops workarounds, and a new trap goes to the coordinator, not into the skill as a sentence.
- The code, by `grep`:
  - The one library declares no `asRR64`. It declares `asFloat(self): RR64` on each number type: `Library/FortressLibrary.fsi:321`, `:415`, `:522`, `:589`, `:661` and `:727`.
  - Its numeral coercions call getters on the four numbers, for example `= v.asZZ32` (`Library/FortressLibrary.fss:847`) and `r.asZZ32` (`:388-389`).
  - The compiler's prelude declares a dotted `asRR64(): RR64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:268`, `:327`).
  - The word `override` appears in the one library only in comments.
  - The landing changed no file under `Library/` or `ProjectFortress/LibraryBuiltin/` (`git diff --name-only 13f4fdea75 HEAD`).
- The standard: `explorations/reviews/revival-record-synthesis.md`, "A small change to the existing process" and "Recovered admission rule, workflow runs and transcript search pointers".
- The evidence searched:
  - The regression quiz (`regression/questions.md` and `key.md`), by `grep` for `override`, `asFloat`, `asRR64`, `asZZ32`, `Byte`, `exit`, `atomic`, superscripts and tuple bindings. Cases 5, 13, 26 and 32 were read whole. No case asks about an exit out of an atomic block, a subscript before a superscript, a tuple binding, a radix point's leading zeros, or self not first.
  - The pretraining quiz (`explorations/reviews/fortress-pretraining-quiz.md`), by `grep` for the same words and for `literal`. `:156` and `:162` (literals that "coerce to the context's type") bear on P-174. Nothing in it bears on the `override` modifier or on `exit`.
- Probes: none were run. Each behaviour that this report gives comes from the record, the quiz's key or the code as read, and the report cites the source each time.

**The test.** An entry is admitted only if a worker would act differently without it, and if the mistake that it prevents has evidence: a failure on record, the regression quiz or the pretraining quiz. An entry is not admitted if the orientation already states it, if an area part owns it, or if no worker would act differently. Its row then says where it belongs.

**The result: three changes are admitted, and they carry seven entries.**

1. F-400, in "Traits and objects", the rule "`override` widens" (`:32`).
2. P-165, with F-324 as the source of its departure, in "Numbers": the rule "`Number` declares nothing" (`:112`) and the `ZZ64` sentence of the `/` rule (`:116`).
3. P-174, with P-173, P-40 and F-342 as the source of its departure, in "Numbers": the coercion paragraph (`:99`).

The rest of the landing is the compiled path's, walk's, the core's or the record's own. Of its rungs, only rung O touches the orientation. Rung R's, W's and A's changes bring an implementation to the specification and to what a worker already expects. They make false sentences in the core and in area parts (below), not in the orientation.

## What the landing makes false in the orientation

- `:32`: "Two departures: the checker accepts such an `override` (row 653), and the code generator refuses every `override` modifier, so a program that writes one does not compile (row 650)." This is false: rows 650 and 653 were closed by `d56eb8a882` and `8dc97a08df` (F-400).
- `:99`: "`... where { v < 256 } = Byte(v.asZZ32)`", and "The coercion's body reads `n`, `r` and `v` as `ZZ` values without a bound, since a numeral's digits fit no fixed width (P-173, P-40). So `v.asZZ32` is `ZZ`'s getter, ...". This is false as the rule. P-174, P-173 and P-40 now say that each number converts where it stands, and that the body has no method invocation. It remains true of the tree (F-342), with no row.
- `:112`: "`Number` declares nothing (P-165). Each of the eight number types declares its own functional method `asFloat(self): RR64`", and "write `asFloat(x) = y`". The first clause still holds. The second puts the tree's name under P-165, which now decides the getter `x.asRR64`. That is true of the tree (F-324), with no row, and false as the decision.
- `:116`: "convert each `ZZ64` operand with the one library's `asFloat`, as `asFloat(s) / asFloat(n)`". This is the same case as `:112`.

These were checked and still hold:

- `:93`: a numeral type has "no getters, no `asFloat`, no `asString`". P-174 keeps this word for word.
- `:97`: a size parameter used as a value, other than a numeral type's number, is a `ZZ32`. P-173 and P-40 keep this.
- `:101`: the fold, and that coercions do not chain.
- `:105-108`: P-46. F-366 changed only in a line number.
- `:7` and the sentences that open "Until the switch-over": the landing changes no declaration of either library.
- No sentence of the orientation names `exit` or `atomic`, a subscript before a superscript, a tuple binding, a numeral's leading zeros, or a functional method with self not first (`grep`).

## Admitted

| Entry | The default a worker holds | The correction for revived Fortress | The mistake it prevents | Evidence | Section it changes |
|---|---|---|---|---|---|
| F-400 | Java's and Scala's `override` at the same signature. The orientation at `:32` adds a second default: the compiled checker accepts an `override` that overrides nothing, and no compiled program may write `override`. | Both paths refuse an `override` that overrides nothing by the rule at `:32`, equal parameter types included. Walk refuses it at load. The checker refuses it statically: 'Invalid override of f in object B: ... has the modifier override and does not override any inherited declaration.' (`compiler_tests/XXXOverrideNothingCompiled`). The code generator compiles the modifier: the class holds the override and a bridge at each hidden declaration's signature (`OverrideModifierCodeGeneration`, `OverrideBridgesCompiled`). | (a) A worker keeps a Java-style `override` because the compiled checker is taken to accept it. Both paths now refuse it. In the library, walk's refusal stops every program.<br>(b) A worker removes or avoids a valid `override` in code meant for the compiled path, or in the one library before the switch-over, because `:32` says that no program that writes one compiles. | Regression quiz case 13. Its question asks for the compiled checker's and the code generator's reaction to `override area()`. Its "Expected" gives the two false clauses, citing rows 653 and 650.<br>The worker failure in that case's trap: a library `override` that overrides nothing stops every program under walk.<br>F-292: the team test `XXXOverrideGenericReturnTypeNotSubtype` overrode nothing under the bound `Any`, and was respelled once the checker refused it. | "Traits and objects", "`override` widens", `:32`. |
| P-165, and F-324 for its departure | Java's `Number.doubleValue()`, and the team's `asFloat` on `Number` (case 26's trap). The orientation at `:112` and `:116` gives the name `asFloat` under P-165, so a worker reads `asFloat` as the curator's decided conversion. | The decided conversion into `RR64` is each number type's getter, `x.asRR64` (P-165). `Number` still declares nothing. The tree has not built the rename: each type declares the functional method `asFloat(self): RR64`, and no type declares `asRR64` (F-324, F-323; no ledger row). A program that runs today writes `asFloat(x)`. The getter waits for its rung (`BOOT.md:15`). | (a) A worker builds on `asFloat` as the decided name: a new number type's or library type's `asFloat`, a test that pins it as the rule, or specification text. The P-165 rung must then undo each one. The rung already counts about 30 lines of the library and 51 test and demo files (`BOOT.md:15`).<br>(b) A worker who reads P-165 writes `x.asRR64`, which no type of the one library declares (`grep`; F-323). | Regression quiz cases 5 and 26. Each expected line writes `asFloat`, and each "Skill" and "Evidence" line cites P-165 for that name. Case 26's trap records the team's `asFloat` on `Number` and the library bodies that called it on a `Number` and failed. | "Numbers", "`Number` declares nothing (P-165)", `:112`; the `/` rule's `ZZ64` sentence, `:116`. |
| P-174, with P-173 and P-40 (the same change), and F-342 for its departure | Haskell's `fromInteger`: a numeral is a value that the coercion receives at run time, read through getters (case 32's trap; pretraining quiz `:156`, `:162`). The orientation at `:99` teaches a form of it: the four numbers are `ZZ` values, and the body calls `v.asZZ32`. | A coercion's body is a computation at compile time, with no method invocation. Each number converts where it stands, into the type that its place fixes, and is refused statically where it does not fit. It is a `ZZ` only where nothing fixes a type. So `Byte`'s coercion is `... where { v < 256 } = Byte(v)` (P-174, P-173, P-40).<br>The tree departs, with no row (F-342, F-345, P-174's last sentence). The checker and walk read each number as a `ZZ` wherever it stands, so `Byte(v)` is refused today: under walk, 'Unification error: Closure/Constructor for Byte param 1 ($b:ZZ32) got arg 255:ZZ of type ZZ'. That was measured at `5f35b1d058` (quiz case 32's key); the checker's refusal is by reading (F-342). The library's own coercions call `v.asZZ32` (`FortressLibrary.fss:847`). | (a) A worker who follows `:99` takes `v.asZZ32` and the `ZZ` reading as the decided design. The worker then defends that design, or builds on it in the checker, the library or the specification. This is the failure on record at `HELD.md:10`.<br>(b) A worker who follows P-174 alone writes `Byte(v)` in a program that must run today, and it is refused on both paths. | `HELD.md:10`: on `Byte(v.asZZ32)`, the coordinator set the record's wording ("read as values ... `ZZ`") against the curator's intent of 11-09. P-174's rewrite followed.<br>Regression quiz case 32. Its "Expected" is `Byte(v.asZZ32)`, and its "Wrong" lists `Byte(v)`; both rest on P-174's old words. | "Numbers", the coercion paragraph that follows "A numeral converts where it stands (P-173)", `:99`. |

### Points for the writer

These points keep the rewritten text from letting a reader conclude more than the evidence establishes.

- **Size.** Keep each change to the sentence that it corrects. The orientation is 34,077 bytes, against the 8K to 12K budget (`tools/orientation/README.md`). Change 1 makes the text shorter.
- **F-400.**
  - Delete the "Two departures" sentence.
  - Make the refusal both paths': "Walk refuses at load, and the checker refuses statically, an `override` that, by this rule, overrides nothing".
  - The code generator's compiling `override` needs no sentence of its own, since a worker expects it once the departure is gone.
  - Add no sentence for rows 1106 to 1109, the walls that remain. These are the two code-generator forms with static parameters, the checker under a conditional extension, no check in an object expression, and walk's override that hides every inherited declaration of its name. P-180 and `403a0e60cb` send a new trap to the coordinator, not into the skill. Each row is in the ledger, and its home part is named below.
- **P-165.**
  - State the decision, the getter `x.asRR64`.
  - Then state, in one clause, the tree's departure and what runs: `asFloat(x)` today, with no type declaring `asRR64` (F-324).
  - Keep `:112`'s rule that `=` across types holds only where a coercion joins them. That rule is unchanged.
  - Do not cite the prelude's dotted `asRR64()` on `ZZ32` as P-165's getter. It is a method of the compiler's prelude, which `compiler.md:149` owns.
  - Bring `:116`'s example in line in the same way.
- **P-174.**
  - Replace the example and the `ZZ` reading with the rule: no method invocation in the body; each number converts where it stands; a `ZZ` only where nothing fixes a type; `Byte(v)`.
  - Then state, in one clause, that the tree reads each number as a `ZZ` wherever it stands, so `Byte(v)` is refused until the rung builds the rule (F-342).
  - Under the convention at `:7`, a departure from a decided rule is asserted in an `XXX` test, with the rule's answer. So a test of the rule writes `Byte(v)` there. Whether to add that a program that must run today writes `v.asZZ32`, as the library does, is the writer's call against P-180. That form is a workaround for an unbuilt decision, not a fix.
  - Keep `:99`'s sentences on the `where` clause, the refusal of `300`, the minus sign, one value per place, and `array1` and `array2`. None of them changed.
- **No row.** The departures of P-165 and P-174 have no ledger row, so their sentences cannot cite one, as `:7` expects. Cite F-324 and F-342 instead. `BOOT.md:15` says that the next planner reproduces each departure and files its row.

## Not admitted

| Entry | Admitted? | Reason, and where it belongs |
|---|---|---|
| F-401 | not admitted | Default: a transaction left abruptly rolls back. The core gives the same default at `SKILL.md:126`: "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block."<br>Correction: an exit commits the block's writes on both paths, as `atomic.tex:60-63` says, and an exception still discards them.<br>The core owns the subject, in "Parallelism and mutable state", and its sentence is now false (review Part 3, item 7). The orientation names no `atomic` rule. The worker's own default, from Java's `break` out of `synchronized`, now matches the tree, and the old workaround still runs. No quiz case asks about it.<br>Rows 1110 and 1111 (walk's `tryatomic` with no enclosing `atomic`) belong to `interpreter.md`. Row 1041 belongs to `compiler.md:156`. |
| F-373 | not admitted | One clause changed: an exit out of an `atomic` block now commits (F-401). The rest is the compiled path's `label` and `exit` (rows 322, 340, 890, 1040 to 1042), which `compiler.md`, "Traps of the compiled path", owns. |
| F-351 | not admitted | The compiled transaction now commits on a `LabelExit` (F-401), and its citations were re-anchored. This is the compiled run time's, which `compiler.md` owns. No worker acts on it apart from F-401. |
| F-397 | not admitted | The orientation's `:93` already defines `n` as "the digit count", and the tree now counts every written digit (row 960, fixed). The sentence that taught the old trim is `interpreter.md:26`, which is now false (review Part 3, item 1). The only failure on record is the rung's own test. |
| F-398 | not admitted | Default: `x[5]^2` is `(x[5])^2`, and a tuple binding's right side runs once, as in math notation and in Scala or Python. Walk now does both, as the compiled path did (rows 1 and 1026, fixed). So the default is right, and no worker needs a correction.<br>The false sentences are `tests-writing.md:34` and `interpreter.md:35` (review Part 3, items 2 and 3).<br>Row 1105 (an array literal in a tuple binding at an array type, under walk) is walk's. Under P-180 it goes to the coordinator. |
| F-363 | not admitted | Its change: walk now runs `B.f()[5]^2` and `x[5]^2` (F-398). The trap that remains, `f(x)^2` as a static error on both paths, is `tests-writing.md:34`'s and stays there. |
| F-387 | not admitted | The compiled half of F-398. A program for both paths now writes the forms unparenthesised. `tests-writing.md:34` owns it. |
| F-369 | not admitted | Its change: walk now runs a tuple binding's right side once (F-398). The compiled binding is `compiler.md`'s.<br>Row 1104 is a new wall: on the compiled path, an object's field bound by a tuple binding whose right side is no tuple expression fails verification. It goes to the coordinator (P-180). |
| F-399 | not admitted | Rung S's revival change is none (`RECORD.md`). The compiled dispatch method now does what walk and the specification do. The false sentence is `compiler.md:157`, rows 573 and 1038 (review Part 3, item 4). Row 594 stands, and `compiler.md` owns it. |
| F-372 | not admitted | Its dispatch clause now points to F-399. This is the code generator's class layout, which `compiler.md` owns. Its row 1037, at `:32`, is unchanged. |
| F-88 | not admitted | The checker's reading of inheritance is unchanged. The only change is a clause saying that the code generator compiles `override` (F-400). That clause is covered by change 1. |
| F-315 | not admitted | The code generator's modifier guard now admits `override` (F-400), and its citation was re-anchored. `compiler.md:89` owns the guard, and its sentence on `override` is now false (review Part 3, item 6). |
| F-292 | not admitted | A record of tests respelled under the bound `Any`. Its new clause, that the checker refuses the override that overrides nothing, is evidence for change 1 (cited there). No worker acts on it otherwise. |
| F-396 | not admitted | The compiled checker's choice at a tie keeps a trait's own declaration where self's type makes the tie (row 1100), and row 1112 stands against the specification. This is the compiled checker's, for `compiler.md`. `compiler.md:58`'s sentence on row 1100 is now false (review Part 3, "False, on no list"). |
| F-323 | not admitted on its own | Its new clause repeats F-324's departure: `asFloat(x)` is the tree's form, and P-165 names `x.asRR64`, which no type declares. Change 2 carries it. The rest, the natives at `RR64`, belongs to `library.md` and `interpreter.md`, "Natives". |
| F-345 | not admitted on its own | The specification's text (the literals chapter reads the four numbers as `ZZ`) against the rewritten P-174, with no row. The specification area owns it (`specification.md`, Appendix I). Change 3 cites F-342, the checker's half, as the departure. |
| F-366 | not admitted | Only a line number changed (`Functionals.scala:1143`). The orientation states its rule at `:105-108`. |
| F-53, F-240 | not admitted | The last landed gate's figures: distance 0 and count 0; the count stage about 75 s and the distance stage 127 s. They belong to the `coordinator` skill's `references/batch.md`. `compiler.md:248`'s "about 80 to 180 seconds" is a little above this gate's 75 s, and "more under load" still holds. |
| F-268, F-281, F-302, F-393 | not admitted | Each changed only in a line number of `CodeGen.java` or `OverloadingChecker.scala`, re-anchored after the batch's hunks. No claim changed, and each keeps its home in `compiler.md` or the performance probes. |

## Outside the orientation, for the skill writer, the coordinator and the quiz author

None of these is this workflow's to change.

**The skill, false or resting on old words** (the review's Part 3 read items 1 to 7 on `main` at `2c8b0f234b`; `.claude/` is unchanged since):

1. `SKILL.md:126`, "Parallelism and mutable state": false (F-401). An exit out of an `atomic` block keeps the block's writes, on both paths. The "set a flag" workaround goes.
2. `SKILL.md:135`, "Static parameters": "but a `ZZ` where it is one of a numeral type's numbers". This rests on P-174's old words, the same change as change 3: the numbers convert where they stand, and are a `ZZ` only where nothing fixes a type. The skill task's step 3 ("The changed decisions") covers it.
3. `references/library.md:23`: "`ZZ64` converts into `RR64` only explicitly, by `asFloat`". This rests on P-165's old name. Bring it in line as change 2 does.
4. `references/compiler.md:89`: `override` is now compiled (F-400; review Part 3, item 6).
5. `references/compiler.md:157`: rows 573 and 1038 are fixed (F-399; item 4).
6. `references/compiler.md:58`: row 1100's order dependence is gone (F-396; "False, on no list").
7. `references/interpreter.md:26`: row 960 is fixed (F-397; item 1).
8. `references/interpreter.md:35`: row 1026 is fixed (F-398; item 3).
9. `references/tests-writing.md:34`: `x[5]^2` now runs under walk (F-398, F-387, F-363; item 2). "`f(x)^T` is a static error" stays.

**For the coordinator** (P-180 and `403a0e60cb`: walls, not skill sentences):

- The departures of P-165 and P-174 have no ledger row (F-323, F-324, F-342, F-345 each say "no row"). `BOOT.md:15` puts their reproduction and rows on the next planner. Until then, changes 2 and 3 cite FACTS entries where the convention at `:7` expects a row.
- The landing's new walls: rows 1104 and 1105 (W), 1106 to 1109 (O), and 1110 and 1111 (A). The review's Part 3 lists rows 1106 to 1109 and row 1041 as "short" passages for the writer to judge. This admission recommends no orientation sentence for them.

**The regression quiz** (each of the four cases covers an admitted change, so no new case is owed):

- **Case 13.** Its "Expected" says "The compiled checker accepts it (row 653), and the code generator refuses every `override` modifier ... (row 650)". Both clauses are false now.
  - The checker refuses the program statically, in F-400's form: "Invalid override of area in object Square: ... has the modifier override and does not override any inherited declaration." That form is from `XXXOverrideNothingCompiled`, and `Square` itself was not run.
  - The code generator compiles a valid `override`.
  - The evidence line gains F-400 and rows 650 and 653 as FIXED (`d56eb8a882`).
- **Case 32.** Its "Expected" (`Byte(v.asZZ32)`, the body reading the numbers as `ZZ`) and its "Wrong" (`Byte(v)` without a conversion) rest on P-174's old words.
  - The decided declaration is `... = Byte(v)`. The tree refuses it today, with no row (F-342).
  - The quiz author sets the grading. A reader who gives `Byte(v)` as the rule and names the tree's departure is right by the record. A reader who gives `Byte(v.asZZ32)` as the rule is wrong by P-174 ("no method invocation"), though that form runs today.
  - The answers on `300` and `2 + 3` are unchanged.
- **Cases 5 and 26.** Their expected lines write `asFloat`, and these lines still run, since the tree has not renamed it (F-324). Their "Skill" and "Evidence" lines cite P-165 for the name, and P-165 now names `x.asRR64`.
  - A reader who writes `asFloat(x)` and names `x.asRR64` as the decided getter, not yet built, is right.
  - A reader who says that `x.asRR64` runs today is wrong, since no type of the one library declares it (F-323).
  - Case 26's "Wrong" (b), `asFloat` declared on `Number` again, stays wrong.
