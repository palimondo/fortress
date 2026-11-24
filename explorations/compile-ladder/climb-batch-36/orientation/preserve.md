<!-- The orientation workflow's preservation check, update mode, for climb batch 36: the three admitted changes (A row 1125, B row 780, C `Byte(v)`) checked against the current part, the admitted FACTS and POSITIONS entries and the destinations; one failure (C drops walk's half of the refusal of a number that does not fit), one passage kept only in a destination that is owed a rewrite, and the placed exceptions. -->

# Preservation check: climb batch 36

**Inputs.**
- The new text is `orientation.md` in this folder. The old text is `.claude/skills/fortress-repo/references/revival-changes.md` at `abd72c0f48`, last changed at `7b7d4c1c56`.
- `diff` of the two files shows exactly three changed lines: `:15`, `:17` and `:99`. These are admission's changes A, B and C. Nothing else moved.
- The admitted entries, read whole with `facts-extract.sh`: F-405, F-26, F-253, F-174, P-45, F-407, F-341, F-342, F-347, P-174 and P-173. Also F-405's word diff `b5a758846d..HEAD`.
- The superseded source lines: `references/sources.md:1274`, `:1569`, `:1591`, `:1606` and `:1616`.
- Ledger rows 779, 780, 1123, 1125 and 1134 (`ledger.py show --short`).
- The tests: `tests/XXXGenericTraitFunctionalMethodsNestedWalk.fss`, `tests/NumeralCoercionBodyWalk.fss:5-6`, `:43-44`, `tests/NumeralCoercionNumberRangeWalk.fss` with its `.test`, and `compiler_tests/NumeralCoercionBodyCompiled.test`.
- The library lines: `Library/FortressLibrary.fss:847` and `LibraryBuiltin/CompilerBuiltin.fss:663`, both `= v`.
- The destinations: `references/interpreter.md:64-68`, `references/compiler.md` (searched for rows 1131 and 1132), and `coordinator/PLAN.md:61`.

## Failures

### 1. C: walk's half of the refusal of a number that does not fit is lost

**Old** (`revival-changes.md:99`): "The tree departs: walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347). Under walk, write `Byte(v.asZZ32)`, as the one library does: the getter raises `IntegerOverflow` outside `ZZ32`'s range."

**New** (`orientation.md:99`): both sentences are deleted. The paragraph keeps only this sentence on a number that does not fit: "In the body, each converts where it stands, into the type that its place fixes. A numeral whose number does not fit there is refused statically."

**Source** (F-407): "Walk binds each as a static number whose default is a `ZZ` …, which converts where its place fixes a type as a folded constant does and is refused there when the place runs. The checker … refuses at the numeral's place a number that does not fit, for a coercion of the numeral's own component." The gated walk test is `tests/NumeralCoercionNumberRangeWalk.fss`, whose comment says "refused where the numeral's place runs". Its `.test` is `load_exception_contains=param 1 ($w:ZZ32) got arg 3000000000`. The binding is top level, so it runs during load.

**What is lost.** Before the update, "refused statically" stated a decided rule that no path built, and the deleted departure said what walk did. The deleted workaround also gave walk's timing: the getter raised at run time. Now the paragraph reads as the tree's behaviour on both paths ("So `Byte`'s body is `Byte(v)`" holds on both). But nothing says that walk refuses a number that does not fit only where the place runs, as a run-time error ('got arg'). So "refused statically" claims more than F-407 for walk. The same section gives this path difference for the two neighbouring cases:
- `:97`: "is refused: by the checker statically, by walk when the place runs".
- `:99`: "The checker refuses statically a numeral that breaks it … Walk refuses it when the binding runs."

**Consequence for a worker.** A worker writes a walk test that expects a refusal before the program runs, or no load exception at all. Or the worker takes a walk program that loads as proof that its coercion's numbers fit, although a place that has not yet run can still refuse. The fix is about six words, in `:97`'s form: "is refused: by the checker statically, by walk when the place runs."

Row 1131 adds a compiled limit: the static refusal covers only a coercion of the numeral's own component. The admission keeps that limit out of the text on purpose ("Placed elsewhere", below). This failure is walk's half only, which the admission did not weigh.

## Kept only in a destination that is owed a rewrite

### B: the departure for plain functional methods of a generic trait

**Old** (`:17`): "For example, walk compares two functional methods of a generic trait or object at each call, not at load (row 780)." Its source, `sources.md:1274`, points to `interpreter.md`, "What walk checks".

**New** (`:17`): "For example, walk refuses a valid pair of generic functional methods of a generic trait, one inside the other, at an extending object's first instance (row 780)."

This example is right. It matches row 780's claim, F-405 ("when an extending object's first instance is made, a nested pair of a generic trait's generic functional methods"), F-26, F-174 and P-45, and `XXXGenericTraitFunctionalMethodsNestedWalk.fss` asserts the rule's answers for the pair.

The admission calls the old example false as a whole. It is false only for row 780's generic pair. Its general half still stands in P-45's list of where walk judges against the rules: "walk compares two functional methods of a generic trait or object on the instance that a call makes (F-26)". F-26 adds: "So a functional method of a generic trait or object is compared on its instance, save two generic ones one inside the other …". The new orientation no longer states this for plain functional methods: `:15` and `:17` speak only in general terms.

It survives in the destination that `:17` points to. `interpreter.md:64` says "Through the stand-in, it does not check two functional methods whose parameter types mention a symbolic type", and `:68` says "At load, it does not check two functional methods of a generic trait or object on their declared domains. It compares them at each call …".

But `:68` is the line that the admission (item 3) and the writer (`writer-1.log`) list for rewriting as "false since rung G". **When `:68` is rewritten, change only its row 780 clause, so that the pair stops at an extending object's first instance.** Keep its first two sentences for plain functional methods, under P-45 and F-26, without row 780. Otherwise this departure, which P-45 still lists, leaves the skill.

## Placed elsewhere by the admission (checked, not failures)

- **A, row 1134.** F-26 and F-253 now give this exception to the rule at `:15`: "except two whose bounds differ only in the api of a type of one simple name, of which the object's is kept (row 1134)". The new `:15` does not carry it. The admission makes it a wall for the coordinator (P-180, `403a0e60cb`). `coordinator/PLAN.md:61` lists row 1134 for the batch after, so it is placed.
- **A, row 1123.** F-405 also holds an earlier exception: "of two generic functional methods of one name and one number of parameters, the second is never chosen (row 1123)". Row 1123 is `NEGATIVE-VERIFIED`. This clause predates the landing, and the old `:15` did not cite it either. With the row 1125 departure gone, `:15`'s bold "never by the order of the declarations" now has no cited departure at all. Row 1123 is a missing overload, a stop with 'Failed to find any matching overload', not a choice of the first applicable one. `PLAN.md:61` lists it for the later batch. Nothing here was introduced by this update.
- **C, rows 1131 and 1132.** F-407 and P-174 give two compiled departures from `:99`'s rule:
  - Row 1131: a number that does not fit in another component's coercion is not refused statically.
  - Row 1132: a number at a call runs the declaration that takes a `ZZ`.

  The admission makes both walls ("C, no new departure"), and `PLAN.md:61` lists them. `:99` ends "`interpreter.md` and `compiler.md` give the other departures from these rules", but `compiler.md` holds neither row (searched). So a worker who follows that pointer does not find them.

## Outside the orientation, to change in the same install

- **`interpreter.md:68` contradicts B.** It says that row 780's pair "loads, and a call can fail with 'Cannot find definition for method'". `:17` sends the worker there ("find the case in `interpreter.md`, 'What walk checks'"). Installed alone, B leaves the two parts saying opposite things about row 780. Not installed, the orientation stays false. Either way, `:68` must change with it (above).
- **Regression case 32's key** is wrong since rung N. The admission already lists it for the quiz author. C's new text agrees with the corrected key the admission describes.

## Count

- **Checked:** the 3 rows of the admission's "Admitted" table (A, B, C). They carry 10 entries: F-405, F-26, F-253; F-174, P-45; F-407, F-341, F-342, F-347, P-174.
- **Failures:** 1 (C, walk's timing).
- **Kept only in a destination owed a rewrite:** 1 (B, `interpreter.md:68`).
- **Exceptions placed with the coordinator:** 4, rows 1134, 1123, 1131 and 1132, each found in `PLAN.md:61`.
- **Lines that changed beyond the three admitted:** none.
