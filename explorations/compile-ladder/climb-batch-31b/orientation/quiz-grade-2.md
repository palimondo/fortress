<!-- The grading of quiz reader 2's answers (quiz-answers-2.md: questions 29 and 36) against the regression key, for climb batch 31b's orientation after the writer's fix round. -->

# Quiz grade 2 (cases 29 and 36)

I compared `quiz-answers-2.md` with `explorations/coordinator/tools/orientation/regression/key.md`, read on 2026-11-17 (its update after climb batch 31b's landing, run 2 of climb batch 31). The reader read the orientation as the fix round revised it (`orientation.md`, written after `quiz-grade-1.md`). No program was run. I ran the reader's record queries for case 29 with `facts-extract.sh` and its `git grep`, to see what they return. I read the passages the reader cites in the orientation (`orientation.md:15`, `:24`, `:74-80`, `:95-101`) and in `interpreter.md` (`:14`, `:86`, `:121`, `:127`, `:141`).

Counts: 2 right, 0 wrong, 0 right without its path or scope qualification. Nothing counts against the orientation.

| case | grade | against the orientation |
|---|---|---|
| 29 | right | no |
| 36 | right | no |

## Case 29: right

- **The instance and the verdict.** `Cell(z)` is a `Cell[\ZZ32\]` today, and `Cell(z).asString` gives `Cell[\ZZ32\]`. The assertion passes on today's tree. Walk is not changed, and no `XXX` test is written. The report states that the brief's premise does not reproduce and quotes the harness line. All of this is the key's Expected 1 and 3. A fix in `EvaluatorBase.java` is planned only for the case where the probe shows another instance, so it is not the key's Wrong form.
- **The record first.** The reader searches before touching walk. The queries say where (`facts-extract.sh`, `ledger-find:`, `P-48`, a `git grep` of the tests), and the plan says what it does with an existing test (add nothing to it). Run as written, `ledger-find:infer*` lists row 364 (`FIXED`, with `Cell` in its title) fifth among its first ten of 84 rows. So the search reaches the closed gap, even though the reader expects other rows there (591, 612, 587, 663, 705). The answer does not say that row 364 is closed. The key does not grade naming record entries.
- **Checked by type, not by the printed name alone.** This point is borderline, and I settle it this way. The probe prints `asString`, and the test file the reader writes asserts the printed text `"Cell[\\ZZ32\\]"`. The answer also gives a type check as the other form of the assertion: `typecase Cell(z) of Cell[\ZZ32\] => true; else => false end`, with the right reason ("Generics are invariant, so only the `ZZ32` instance matches that arm"). The key's Partial requires "only the printed name as the check". This answer offers more than that. The key itself says that `asString` "is now also the instance". So the printed assertion is a true test today, not the false green of climb batches 27 to 29. If the coordinator reads Expected 2 as requiring the kept assertion to be the type check, the grade becomes the key's Partial. It would not count against the orientation: no passage of the orientation says that printing shows the instance, and the key's Skill line names no place that states "check by type".
- **The key's reasoning.** The reader rules out each of walk's exceptions from the orientation's P-48 rule. The bound `Any` does not name `T`, so `T` is not `OPEN`. `T` has one bound (row 591) and is bounded by its argument (row 612), and no function expression fixes it (row 587). The reader also reads `interpreter.md:86` correctly: walk refuses `f[\T extends Any\](x: T)` at load only when the function is overloaded. `z: ZZ32 = 3` binds a `ZZ32` by the orientation's P-173 rule.
- **None of the key's Wrong forms.** No change to walk's inference. No `XXX` test. Row 364 is not called open. No `Int` appears in output or as a class. The record is searched.
- **Scope.** Walk only, and the checker fixes `T` statically. This matches the key.
- **Not graded.** The reader's `git grep -n 'Cell' ProjectFortress/tests | grep -i asString` finds only `tests/InferredStringStaticArgWalk.fss:10` (`Cell("s")`). It does not find `tests/LanguageTypeInstancesWalk.fss:22`, which asserts this case by dispatch, `kind(Cell(z))` = "ZZ32". So the reader would add `CellInstanceFromArgumentWalk.fss` beside a test that already holds the case. The key allows a plain passing test when the brief asks for one, as this question does. Row 364, which the reader's own `infer*` query lists, points to the promoted tests and would have avoided the duplicate. `ledger-find:instance asString` finds no row. The reader puts a question to the curator on whether the brief meant one of walk's real departures. That is sound, and the key does not ask for it.

## Case 36: right

- **(a)** `kind(3)` gives "Int" and passes "only by accident". `kind(1.5)` gives "Int" too, so the second assertion fails and the test is red. The reason is the orientation's rule: an arm at an undefined team name takes every value, without a message (row 959). The numerals take their defaults at `Number`. This is the key's answer. It avoids the key's Partial: the value "Int" for `1.5` is given. The reader also declines to assert row 959's behaviour in a plain test.
- **(b)** The arms are `ZZ32 => "ZZ32"`, `RR64 => "RR64"`, `else => "other"`, renamed with their strings; the key counts either labelling right. The declaration is `value object Meters(v: ZZ32) extends Number` with `opr +(self, other: Meters)` declared in the object. The reason is the Meet Rule: an object excludes the arrays, and `Number` has no `comprises` clause (P-160). The reader adds that `Number` declares nothing, so there is no abstract method to define (P-165). The assertions are `kind(3)` = "ZZ32", `kind(1.5)` = "RR64", `kind(Meters(2))` = "other", and `(Meters(1) + Meters(2)).v` = 3. All of this is as the key. The replacements for `Long`, `BigNum` and `UnsignedLong` are given by the orientation's order.
- **(c), the planned extender.** Walk refuses it at load: 'Attempt to extend object type ZZ32', and the whole test is red. The number types are value objects, and no type of a program extends one (P-43, P-178). On the compiled path today the checker accepts it, because the prelude still has open traits (row 1003), and the run dies at class load (row 866). This is the key's answer, with the reason. After the switch-over the reader gives a static refusal only "by my reading", and says that the orientation does not state it. That matches the key's Open: no run shows the outcome. Walk's refusal is not reported as a defect.
- **(c), the reader's `Meters`.** It loads and runs under walk. On the compiled path it runs, which the reader takes from the orientation's "Such a type runs on both paths" (P-160). This is the key's answer. Reader 1 hedged here (`quiz-grade-1.md`, case 36), and the fix round's added clause settled it for this reader.
- **None of the key's Wrong forms.** No arm, type, test or message names a removed object. `Meters` is not below a number type, and it has its `Number` parent.
- **The stale area part.** The reader met `interpreter.md:141` ("Natives": a program's object that extends `ZZ32` loads, row 551), together with `:121` and `:127`, which still name `Int`, `Long` and `Float`. It acted on the orientation and named the area part as stale for its maintainer. These are the key's stale lines. They caused a remark, not an error.

## Failed cases

None.

## Notes for the writer, none against the orientation

- The fix round's clause "Such a type runs on both paths" (`orientation.md:95`) worked. Reader 2 quotes it for the compiled half of case 36 (c), where reader 1 hedged.
- Both readers, in both cases, met `interpreter.md:121`, `:127` and `:141` ("Natives") naming the removed objects and an extender that loads. Each time they chose the orientation. Climb batch 31b's `orientation/admission.md`, "Outside the orientation", already lists these lines. Fixing them is the area part's job.
- In case 29 the reader's kept assertion is the printed name. It holds today only because, since P-178, walk prints the instance's own class. The orientation has no sentence telling a reader to check an instance by type rather than by its printed text. The key does not require one, so this does not count.
