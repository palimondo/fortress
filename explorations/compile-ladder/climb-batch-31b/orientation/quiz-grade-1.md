<!-- The grading of quiz reader 1's answers (quiz-answers-1.md: questions 29 and 36) against the regression key, for climb batch 31b's orientation. -->

# Quiz grade 1 (cases 29 and 36)

Compared `quiz-answers-1.md` with `explorations/coordinator/tools/orientation/regression/key.md`, read on 2026-11-17 (its update after climb batch 31b's landing, run 2 of climb batch 31). No program was run. The reader's record queries for case 29 were run with `facts-extract.sh` to see what they return; the passages the reader cites were read in the orientation (`orientation.md:24`, `:95-105`, `:118`) and in `interpreter.md`.

Counts: 2 right, 0 wrong, 0 right without its path or scope qualification. Nothing counts against the orientation.

| case | grade | against the orientation |
|---|---|---|
| 29 | right | no |
| 36 | right | no |

## Case 29: right

- Record first, then a reproduction: the reader plans a ledger and FACTS search before any change, then a scratch probe run directly under walk. The key's Expected 1 and 2 in form.
- Checked by type, not by printing alone: `which(c: Cell[\ZZ32\])` beside `which(c: Any)`, with the reason (generics are invariant, so only an exact `Cell[\ZZ32\]` answers "ZZ32"). `asString` is used only as a second view.
- The instance: `Cell[\ZZ32\]` today, by the orientation's P-178 (a `ZZ32` value's class is `ZZ32`) and its rule that `Int` does not exist. `asString` predicted as `Cell[\ZZ32\]`, the probe's output to be quoted. As the key.
- The assertion `assert(which(Cell(z)), "ZZ32", ...)` passes on today's tree; no code of walk changes; no `XXX` test; the premise is reported as a finding with the probe's command and output. The key's Expected 3. The branch that edits walk applies only if the probe shows another instance, so it is not the key's Wrong form.
- None of the key's Wrong forms: row 364 is not called open, no `Int` is expected in output or named as the class. The reader saw that `interpreter.md:127` ("Natives") still names `Int` as the library's object below `ZZ32`, sided with the orientation, and named the conflict as one more reason to measure.
- Scope: walk only, the compiled checker inferring statically, unchanged by the switch-over. As the key.
- Not graded, for the record. The reader's search words would not have found the entries the key names. `ledger-find:infer* instance` lists 11 rows (504 to 867) without 364; `ledger-find:infer* constructor` lists rows 705 and 1032; `infer*` matches no FACTS title. The key's words find it: `ledger-find:run-time class` lists row 364 first. The reader's plan for a found row covers an open one only ("its reproducer names the test that I promote or extend"). The decision does not rest on the search, since the probe settles it and the plan for the passing outcome is the key's. The key also does not grade naming row 364 or F-344. One side effect: without row 364 the reader would write `GenericObjectArgumentInstance.fss` beside `tests/LanguageTypeInstancesWalk.fss`, which already holds the case. The key allows a plain passing test when the brief asks for one, as this question does.

## Case 36: right

- (a) `kind(3)` gives "Int" and passes, "only because the `Int` arm takes everything"; `kind(1.5)` gives "Int", so the second assertion fails and the test is red. This is the key's answer, including its point that the first pass is for the wrong reason. The reader adds that no kept assertion may rely on row 959.
- (b) The arms `ZZ32 => "Int"`, `RR64 => "Float"`, `else => "other"`, with the team's strings kept as labels; the key counts these right. `value object Meters(v: ZZ32) extends Number` with its `+` declared in the object, and the reason it passes the Meet Rule (an object excludes the arrays). `kind(Meters(2))` gives "other", and `(Meters(1) + Meters(2)).v` = 3 checks the `+`. All as the key. The numerals' defaults at `Number` (`ZZ32`, `RR64`) are given by the orientation's rule.
- (c) The planned extender: refused at load under walk, 'Attempt to extend object type ZZ32', the whole test red; on the compiled path today the checker accepts it, the prelude's `ZZ32` being an open trait (row 1003), and it dies at class load (row 866). The reader's `Meters` loads and runs under walk. All as the key, with the reason the extender cannot stand (P-178, P-43). None of (c)'s Wrong forms: walk's refusal is not reported as a defect.
- One hedge, not a wrong claim: for the reader's own `Meters` on the compiled path the key says it compiles and runs. The reader says rows 1003, 866 and 963 do not apply, says the skill gives no case for it, and would compile it with `bin/fortress compile` and report the result, not assert it in the walk test. That names where and what it does with the result, and no kept file depends on it. The key's Partial ("no compiled answer in (c)") does not apply: the compiled answer for the planned declaration, the point of (c), is given.
- Scope: the extender by path before the switch-over, with the after-switch-over static refusal stated only "as what the rule implies". That matches the key's **Open** (no run shows it). The reader does not say that the arms behave alike on the compiled path; the key does not require it.
- The reader again saw `interpreter.md` "Natives" contradict the orientation: `:141`, where an object that extends `ZZ32` loads and stops with 'getInt not implemented' (row 551). It relied on the orientation and named the stale passage. These are the key's stale area-part lines; they caused a remark, not an error.

## Failed cases

None.

## Notes for the writer, none against the orientation

- `interpreter.md:127` and `:141` ("Natives") still name `Int`, `Long`, `UnsignedLong` and `BigNum` as the library's objects and say a program's object below `ZZ32` loads. The reader met both lines, in cases 29 and 36, and both times chose the orientation over them. Climb batch 31b's `orientation/admission.md`, "Outside the orientation", already lists them. They are the area part's to fix.
- The orientation's "Declare a program's own number type below `Number` (P-160)" (`orientation.md:95`) has no path qualifier. No sentence says that such an object compiles and runs against the compiler's prelude. The reader read that as silence and hedged on case 36's last part. One clause would settle it, as "on both paths". The key does not require it.
