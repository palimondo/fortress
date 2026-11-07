<!-- The orientation workflow's judgement of climb batch 27's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz. Three sections install: "Dispatch and overloading" (P-160's Meet Rule sentence), "Traits and objects" (P-168's SEQV rule, and the fix round's sentence on where to write `I extends Index`), "Numbers" (P-165's rule that `Number` declares nothing, and F-328's printed names); no section is held. Also: preserve.md's failure 2, walk's `FloatLiteral`, measured here and shown to reach `=` on value objects and long tuples; the sizes and the size exception; what the install needs; findings on unchanged text, for the next update. Read on `main` at `0549157f4`, where `revival-changes.md` is the admission's base text (the last commit to touch it is `c3df95aad`), and orientation.md is the fix round's text of 15:56 UTC. -->

# Climb batch 27's update of the orientation: the judgement

Mode: update.

**What I read.** In this folder: `orientation.md` (the final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `quiz-cases.txt` (cases 5, 12, 16, 21, 26 to 29) and both writer logs. The current part, `.claude/skills/fortress-repo/references/revival-changes.md`, and its `diff` against `orientation.md`: five hunks, at lines 24, 48, 55-62, 88 and 92-93 of the new text. F-326, P-156 and P-168 (`facts-extract.sh`). Ledger rows 364, 807, 908, 918 and 923. Primary sources for the new sentences:
- `Library/FortressLibrary.fsi:288` (`Number`), `:321`, `:415`, `:502`, `:564`, `:633`, `:697`, and `FortressBuiltin.fsi:70`, `:136`, `:199` (each type's `asFloat`);
- `FortressLibrary.fsi:2798-2806` (the array-and-number `-`, `MIN` and `MAX`);
- `FortressLibrary.fss:96` (the `=` over `Any`);
- `CompilerLibrary.fss:63-69` (`===`), and a search of the compiler's library for an `=` over `Any` or over tuples, which finds none;
- `Specification/appendices/changes.tex:2755-2783`;
- `tests/StrictEquivalenceRuleWalk.fss` and `compile-ladder/rung-seqv-meaning/SKEPTIC.md:60`.

The standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

**What I ran.**
- Reads, `grep`, `diff` and `wc`.
- `skills-lint.py` on a scratch copy of `orientation.md` laid out as the part: no hit, exit 0. Neither writer could lint, so this is the text's only lint.
- One walk probe, from a private caches folder outside the tree, to settle `preserve.md`'s failure 2 (below). The tree is unchanged.

**Which text each check read.**
- The first text, of 22,425 characters: `preserve.md` (15:31), `cold-read.md` (15:31) and `quiz-grade-1.md`.
- The final text, of 22,974 characters: `cold-read-2.md` (16:01) and `quiz-grade-2.md`, whose reader worked from the fix round's text (`quiz-grade-2.md`, its opening comment).

Line numbers below are those of the final text.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | nothing | no change | none |
| Dispatch and overloading | 9-24 | line 24 (P-160): a program's trait with its own functional `+` excludes `Number` or the arrays, or walk refuses it at load; the checker accepts it against the library's `+` (row 918); `-`, `MIN` and `MAX` take the same exclusion | install | `preserve.md`, "Checked and kept", P-160; case 27 right in both rounds; `cold-read-2.md` section 1, "Dispatch", last bullet, read right |
| Traits and objects | 26-61 | lines 55-61 (P-168): where a type declares no `=`, `=` is `SEQV`; line 48: until the switch-over, write `I extends Index` only in code that runs under walk or is checked against the interpreter's library | install, both changes | `preserve.md` failures 1 and 5 fixed in the final text; case 28 wrong in round 1 because of the text and right in round 2 (`quiz-grade-2.md`: "The second round's rewrite of the `SEQV` paragraph ... worked"); `cold-read-2.md` section 1, "Traits and objects", last two bullets, read right; failure 2 is weighed below |
| Static parameters, `where` clauses and sizes | 63-82 | nothing | no change | none |
| Numbers | 84-96 | line 88 (F-328): walk prints its numeral classes by the traits' names, and `Cell(3)` is a `Cell[\Int\]` and no `Cell[\ZZ32\]`; line 92 (P-165): `Number` declares nothing | install, both changes | `preserve.md` failures 3 and 4 fixed in the final text; cases 5 and 26 right in both rounds, case 29 right and then partial for a cause outside the orientation (`quiz-grade-2.md`, "Cause: the reader's slip"); `cold-read-2.md` section 1, "Numbers", bullets 2 and 4, read right |
| Reductions and comprehensions | 98-108 | nothing | no change | none |
| Implementation limits | 110-114 | nothing | no change | none |

The whole text installs: the current part with the five hunks above. No section is held, so `queue.md` files no item.

### Dispatch and overloading: install

The new sentence states P-160's consequence and its remedy. Its sources agree:
- row 918, "a pair that it refuses inside one component and walk refuses at load";
- `FortressLibrary.fsi:2798-2806`, which declares `-`, `MIN` and `MAX` between an array and a number in the form of `+`.

The fix round turned the first text's measurement note ("only `+` was measured", `cold-read.md` section 3) into an instruction. The instruction is safe: an extra exclusion cannot make a valid program invalid.

Second cold read, item 11, on this line: the text names no array trait for "make it exclude arrays", and "`Number` is open" comes before line 92's "no `comprises` clause". This does not send a worker wrong. The first remedy, `excludes { Number }`, can be written from the text as it stands, and both quiz readers wrote it (case 27). Items 10 and 17 concern the sentence before, which this update did not change.

### Traits and objects: install

**The `SEQV` rule (lines 55-61).** I checked each claim against its source:
- the fallback `=` (`FortressLibrary.fss:96`);
- the three cases of `SEQV` (P-168, F-326);
- strings as reference objects (P-168);
- the 4-tuple (row 923, "design limit (library)", whose test asserts `false` as the rule's answer);
- walk's `=/=` and three-argument `assert` (row 807, its notes and its workaround `assert(x = y, msg)`);
- the compiler's library, which declares no `=` over `Any` and none on tuples (a search of `Library/Compiler*` and `LibraryBuiltin/Compiler*`), and its `===` (`CompilerLibrary.fss:64-68`, row 908).

The fix round closed `preserve.md`'s failures 1 (row 807's limit) and 5 (the compiled half). It also closed the cause of case 28's wrong answer in round 1: the text no longer cites row 923, which the opening's convention would have read as a path's departure.

**`preserve.md` failure 2: walk's `FloatLiteral`. Measured here, it does not hold the section.**
- **What the record says.** F-326: "Under walk a float numeral bound to `RR64` stays a `FloatLiteral`, not `SEQV` a computed `RR64`."
  - The admission routed this to `interpreter.md`, because "Only a direct use of `SEQV` meets it".
  - The preservation check reasoned that `=` on a value object without its own `=`, or on a tuple of four or more, meets it too, but did not run it.
  - Writer 2 left it out: "It needs a row or a measurement before the orientation can state it".
- **What I ran.** A probe under walk, on `main`'s build. Each pair below holds the same bits:

      value object V(f: RR64) end
      x: RR64 = 0.25 + 0.25
      y: RR64 = 0.5
      y SEQV x                      false
      V(0.5) = V(x)                 false
      V(y) = V(x)                   false
      V(x) = V(x + 0.0)             true    (control: both computed)
      (y,1,2,3) = (x,1,2,3)         false
      (y,1) = (x,1)                 true    (control: a pair's own =)

  So the admission's reason for keeping the point out of the orientation is refuted. Line 58 says that a value object compares field by field and a float by its bits. A worker who reads it expects `V(0.5) = V(0.25 + 0.25)` to be `true`. Under walk it is `false`.
- **Why the section still installs.**
  1. The text states nothing false. The record reads the case as P-168's own rule, not as a gap: `FloatLiteral` is a type of its own, so "values of different types are never equivalent" covers it (fork E1, `rung-seqv-meaning/SKEPTIC.md:60`, "no ledger row is owed"; review-queue item 399). What the text omits is walk's numeral class for floats. Line 88 gives that class for integer numerals only.
  2. The old text omits the same thing. A hold keeps a part with no `SEQV` rule at all. There the worker's default, structural equality and strings by their text, already predicts `true` for the float case. It also gets the string and 4-tuple cases wrong, which cost the revival's own `TransposedMatrixAndFreeze.fss` and case 28's first reader. A hold therefore cures nothing and loses the correction.
  3. The text's remedy covers the case. A value object given its own `=`, or compared part by part, compares its float by `=`, and `FloatLiteral` extends `RR64`.
  4. The finding is not lost. F-326 holds it, and the admission names its destination.
- **What it needs.** It is the first install condition and the first point for the next update (below).

**The `Index` sentence (line 48).** It answers `cold-read.md` item 1, which was rated high: the old paragraph told the reader both to write the bound in their own generics and that a program naming `Index` does not compile. The new sentence follows from the paragraph's own sentences and P-156. The second cold read's item 15 says that the paragraph's first sentence still reads as unconditional. But that reader's section 1 acted right ("I would write `I extends Index` only in code that runs under walk or is checked against the interpreter's library"). The failure the item imagines is a compile error that the paragraph itself explains, not a silent wrong result. A hold would keep the old text, in which the problem is worse. The item is listed for the next update.

**Second cold read, item 2, on line 61.** The `===` sentence carries both markers, "Until the switch-over" and a row. Under the opening's convention, both lead to the same action: do not fix it in the prelude, and do not assert its answer in a test. Row 908 itself says that it ends at the switch-over. So the item sends no worker wrong. The convention, which the old text shares at line 94, is listed for the next update. The same report's section 3, item 4, calls the `===` sentence detail. The admission asked for that sentence to be kept, so it is weighed under "Size".

### Numbers: install

**Line 92.** I checked each claim against its source:
- `Number` declares nothing (`FortressLibrary.fsi:288`, two empty traits);
- `asFloat` on the eight types and `IntLiteral` (the six traits in `FortressLibrary.fsi`; `RR32`, `NN32` and `IntLiteral` in `FortressBuiltin.fsi`, `IntLiteral`'s into `Float extends RR64`);
- `=` across types only through a coercion, else `SEQV` and `false` (`changes.tex:2776-2783`, a `QQ` against an `RR64`), with `1/2 = 0.5`, the admission's example from `tests/FlatTowerRungF.fss:75-76`.

Writer 2 replaced "no arithmetic", which the preservation check proposed, with "no method or operator that the number types declare", because the library declares a unary `+` at `T extends Number`. That is the more exact wording. "At known types" and "in generic code, declare the function at each number type" answer `cold-read.md` item 13. Both quiz readers answered case 26 by these rules.

Second cold read, item 26 (low-medium): the text does not list which types coerce into which. This does not send a worker wrong. The text's advice, `asFloat(x) = y`, is right whichever coercion exists. The one pair that it is easy to get wrong, a `ZZ64` against an `RR64`, is the text's own example.

**Line 88.** The clause adds the printed names, and restores the old consequence, "and no `Cell[\ZZ32\]`" (`preserve.md` failure 4). Row 364's new text agrees. Items 23 and 24 of the second cold read concern the paragraph's older sentences, `IntLiteral`'s arithmetic (row 578) and the term "run-time class". The first is the batch 26 judge's finding 4, still open.

## Size

- **Before:** 20,192 characters (`revival-changes.md` at `c3df95aad`).
- **After:** 22,974 characters, +2,782:
  - "Dispatch and overloading" +516;
  - "Traits and objects" +1,309: `SEQV` about +1,200, `Index` about +110;
  - "Numbers" +957.

  The admission estimated about 1,450 characters and one clause. The first text ran +2,233. The fix round added +549, every addition in answer to a failure of the checks: row 807's limit, the compiled half, "and no `Cell[\ZZ32\]`", the `Index` sentence, and "at known types".
- **Size exception: accepted for this install, and the conflict is exposed again.**
  - **The budget.** It is 8,000 to 12,000 characters (`tools/orientation/README.md`; the synthesis, "Choose a provisional budget"). The part is now 10,974 characters over its top, 91% more than the budget allows.
  - **Why it was accepted.** The judges of climb batches 24 and 26 accepted the same exception. Each of this update's three changes is an admitted correction, and the first two have a recorded worker failure. Nothing in the new text could be cut without reopening a failure of the checks. The one candidate is the `===` sentence (about 120 characters), which the admission asked to keep.
  - **The conflict.** No update has cut anything to make room. The standard says that new content "must compete for space through consolidation; it must not bypass the budget merely because it is new". Three updates in a row have now bypassed it.
  - **Ways to settle it.** The candidates for a consolidation are listed in the first cold read, section 3 (ten items), the second cold read, section 3 (seven items), and writer 2's log, "Cold-read points on text that this landing did not change" (four decisions). The other way is a new budget.
  - **Who decides.** The coordinator, before the next update adds to the part. Per the standard, the conflict is exposed here and is not met by compressing the prose.

## The install

1. Copy `orientation.md` over `.claude/skills/fortress-repo/references/revival-changes.md`.
2. In the same commit, add `sources-mapping.md` to `references/sources.md` as a dated entry. It now holds F-324's detail as well, which closes `preserve.md` failure 7. No line of `sources.md` cites a sentence that this update removed. The old line 80's `Box[\Int\]` is not cited there.
3. Land the skill update's corrections with this install, or before it. Two area parts contradict the installed text:
   - `tests-writing.md:32`, "Otherwise they compare by identity (ledger row 807)", is now false: the fallback is `SEQV`. It is the trap that `key.md`'s case 28 names.
   - `compiler.md:62`, "The `value` modifier has no effect on the representation", is now false: the class carries `ValueObjectMark`.

   The admission's "Elsewhere" lists both, with the other area-part items: `interpreter.md`'s carriers and natives (P-167's loader table, which is `preserve.md` failure 6; `JavaBufferedWriter`), `tests-running.md`'s `Generator2Demo`, `library.md`'s `RR64` bullet, and `compiler.md`'s type assumption.
4. **Walk's `FloatLiteral` (`preserve.md` failure 2) goes to `interpreter.md` with the skill update, as the admission routed it, and to the next update's admission.** Use the measurement above as its evidence, now that the admission's reason is refuted.
   - **Proposed sentence**, for the `SEQV` rule or line 88, about 250 characters: "Under walk a float numeral bound to `RR64` stays a `FloatLiteral`, a type of its own, so a value object without its own `=`, or a tuple of four or more, that holds one is not `=` to one that holds a computed `RR64` of the same bits (F-326)."
   - **The other way** is to add the sentence at this install. The skill writer's cold read of the installed part would then be its only check. I leave that choice to the coordinator. My default is the process: this install takes `interpreter.md`, and the next update takes the orientation.
5. **The quiz.** The changes to `regression/key.md` and `regression/questions.md` (cases 26 to 29, and case 5's "Since earlier keys") are uncommitted in the working tree, and go with this folder.
   - Case 28's **Skill** line still names "its pointer to `tests-writing.md`". The final text replaced that pointer with the row 807 sentence, so the line should name that sentence instead.
   - Case 28's **Scope** keeps the `FloatLiteral` point as one that "the program does not reach". That is true of its program, whose `Point` holds `ZZ32`s.

## Findings on unchanged text, for the next update

None is an item, because no section is held, and a hold would keep the same sentences.

1. **Bold sentences that describe one path** (`cold-read-2.md` item 1, high; `cold-read.md` item 9). Line 5 calls each bold line "the rule of this tree", yet lines 15, 17, 71, 88, 102 and 112 describe one path. Line 71 cites its own departure (row 705).
2. **The two markers in one passage, and library or prelude** (`cold-read-2.md` items 2 and 3; `cold-read.md` items 4 and 11): line 7 against lines 61 and 94. Writer 2 names the decision: either make the two markers exclusive, or keep both.
3. **`override` widens (line 32) against row 650** (`cold-read-2.md` item 13; `cold-read.md` item 2; the batch 26 judge's finding 1). It is still open: the text does not say what to write when a widening must compile.
4. **Departures that cite no row** (`cold-read-2.md` items 14, 17 and 18; `cold-read.md` item 10): walk's two refusals of the self-typed pair (lines 45-46), the `pick` example (line 65), and the compiled runtime's unchecked `where` clause (line 78). The batch 26 judge's finding 2 is still open.
5. **The meaning of a row citation, and nothing to cite** (`cold-read-2.md` items 4 and 5; `cold-read.md` items 3 and 15; `quiz-grade-1.md`, case 28). Writer 2 names the decision: narrow the opening's convention to rows that record a path's gap, or keep removing such citations sentence by sentence.
6. **`IntLiteral` under walk, row 578 (line 88)** (`cold-read-2.md` item 23; `cold-read.md` item 12; the batch 26 judge's finding 4, still open).
7. **The first sentence of the `Index` paragraph** (`cold-read-2.md` item 15): it could carry the scope that the paragraph's last sentence gives.
8. **"Exclusion" in two senses (line 13), "at every instance" (line 11), "only at a call" (line 17), "counts for it" (line 24)** (`cold-read-2.md` items 6 to 8 and 10; `cold-read.md` items 7, 17 and 22).
9. **History and repeated detail to cut in a consolidation** (`cold-read-2.md` section 3; `cold-read.md` section 3): route C, line 43's justification of the library's pairs, the second `NatReflect` reason, the `===` sentence, the core's repeats at lines 65, 102 and 112, and the base-0 power crash.
10. **Low** (`cold-read-2.md` items 9, 12, 16, 19 to 22 and 25 to 32): among them, walk on duplicates (line 19), route B (line 86), the empty `BIG MAX` (line 108), and `=` and `Index` filed under "Traits and objects" (item 32).
