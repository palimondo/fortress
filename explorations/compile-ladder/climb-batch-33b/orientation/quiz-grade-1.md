# Quiz grading, round 1 (case 36)

The answers: `quiz-answers-1.md` in this folder. The key: `explorations/coordinator/tools/orientation/regression/key.md`, case 36, as climb batch 33b's update reads it (on `main` at `ff42b70e15`). The orientation graded: `orientation.md` in this folder. The case is graded on its decision and scope, by the key's **Expected**, **Wrong** and **Partial** lists.

## Counts

- Right: 1 (case 36).
- Right without its path or scope qualification: 0.
- Wrong: 0.
- Wrong and counted against the orientation: 0.

## Case 36: right

- (a): walk refuses the program before `run()`, at name binding, with 'Int is undefined.' at the arm `Int` and 'Float is undefined.' at `Float`, so neither assertion runs and the plain test is red. The reader scopes it to both paths, before and after the switch-over, since no library declares the five names (P-178, F-379, F-382). This is the key's answer, with the messages and the path scope. It avoids the key's **Wrong** answers for (a): "Int" for both values, the old behaviour before row 959's fix, and either assertion running.
  - Not graded: the reader writes "Only the team's bare-binder form `x =>` is refused". Read in context, it contrasts `x =>` with `else =>`, which is fine. It is not a claim that the arms `Int` and `Float` load. The question has no `x =>` arm.
- (b): the arms are `ZZ32 => "Int"`, `RR64 => "Float"` and `else => "other"`. The test's labels "Int" and "Float" are kept, which the key accepts ("kept as the labels of arms at `ZZ32` and `RR64` are right too"). The declaration is `value object Meters(v: ZZ32) extends Number` with `opr +(self, other: Meters): Meters = Meters(v + other.v)`, word for word the key's. `kind(Meters(2))` gives "other". The `+` is checked by `(Meters(1) + Meters(2)).v` = 3. The numerals take their defaults at `Number`, `ZZ32` and `RR64` (P-173). The reader also makes the key's case-12 point correctly: the object's own `+` does not meet the library's array-number `+`, because an object excludes `HasRank`. No arm, type or message is at a removed name, and `Meters` is below `Number`, not below a number type. So none of the key's **Wrong** answers for (b) applies.
  - Not graded: the reader's lookups (P-160 and P-178, a `git grep` for an existing test of these cases, and a check that `v` is no functional method of the library). Each one says where to look and what to do with the result. They add to the decision; they do not replace it.
- (c): under walk, the planned `object Meters(v: ZZ32) extends ZZ32` is refused at load with 'Attempt to extend object type ZZ32'. On the compiled path, before the switch-over, the checker refuses it with 'Invalid type in extends clause: ZZ32', since `ZZ32` is a value object in the compiler's prelude too (F-388). After the switch-over it is refused the same way. The reader's own `Meters` loads and runs under walk, and the compiled checker accepts it and it runs compiled. This is the key's answer, with each path's own message. The refusal is placed in the compile's checker, so it is static, and the paths are not said to differ. The reader does not give the old compiled answer (accepted, then dying when its class loads, row 866), which the key's **Wrong** for (c) lists. The reader does not mention that no jar is written or that `fortress run` then prints 'Could not load'; the key does not require it.
- Scope: both paths refuse the planned declaration, before and after the switch-over, and the reader's declaration runs on both paths. This matches the key's **Scope**.
- Passages relied on, each checked against `orientation.md` in this folder: `:89` ("Do not extend a number type in a program … Both paths refuse an object below one of the seven … Walk refuses it at load: 'Attempt to extend object type ZZ32'. The compiled checker refuses it: 'Invalid type in extends clause: ZZ32'."), `:91` (the five names undefined on both paths, their replacements, and the `typecase` arm at such a name given the same message), and `:24` (an object excludes every trait that it does not extend). The reader also cites the core's "Numbers are siblings, not a tower" and `tests-writing.md` on refusals and on kept assertions. Each passage served the reader. These are climb batch 33b's update's wordings, which the key's **Skill** names as the candidate's. The old compiled sentence of `revival-changes.md:89` at `ff42b70e15` did not reach the answer.

## Failed cases

None.
