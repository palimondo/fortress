<!-- Climb batch 35b's orientation judgement (update mode, run 2 of CLIMB-BATCH-35.md): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, and the size before and after. Installed: :48, :57 (F-403) and :64 in "Traits and objects", and "Reductions and comprehensions" (:130). Held: two cuts of the fix round, :41 and :43 in "Traits and objects", the same cuts that climb batches 33b and 35 held. -->

# Climb batch 35b: judgement of the orientation update

**What was judged.** `orientation.md` in this folder: the writer's text after the fix round (`writer-2.log`), 34,594 bytes.

**Against what.** `.claude/skills/fortress-repo/references/revival-changes.md` on `main` at `ddfa65d880`, 34,761 bytes. That file last changed at `2dd2936b4e`. `.claude/` has no change in the working tree (`git status`: only the regression key, its questions and this folder).

**The standard.** `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

**The reports read.**

- `admission.md`, `preserve.md`, `cold-read.md` and `cold-read-2.md`.
- `quiz-grade-1.md`, `quiz-grade-2.md` and `quiz-cases.txt` (cases 28 and 39).
- `sources-mapping.md`, `writer-1.log` and `writer-2.log`.
- The regression key (`explorations/coordinator/tools/orientation/regression/key.md`, modified in the working tree, not committed): cases 21, 22, 35 and 39, with their **Skill** lines at `:262`, `:276`, `:479` and `:650`.
- `climb-batch-33b/orientation/` and `climb-batch-35/orientation/`, `judgement.md` and `queue.md`, for the same cuts judged before; review-queue items 526 and 605.
- F-403; `Library/FortressLibrary.fsi:2790-2794` and `.fss:4920-4924`; `Library/CompilerLibrary.fsi:25-43` and `.fss:19`, `:63-71`; `nativeHelpers/equalityRule.java:31-51`; `references/compiler.md:98`; `compile-ladder/rung-reduction-types/REPORT.md:42-43`, `:53`; the skill's `references/sources.md:1124` and `:1129`.

Nothing was built or run.

## Verdict

**Whole text: install, except two cuts of the fix round in "Traits and objects", which are held.**

A `diff` of the two files changes six lines in two sections:

- **"Traits and objects":**
  - `:41`: the fix round cut the list of shapes in which a compiled `self` return runs.
  - `:43`: the fix round cut "and the bounds that the test reads" and "so it loads such a pair".
  - `:48`: the fix round moved the scope of `I extends Index` into the instruction.
  - `:57`: the admitted change (F-403), with the fix round's clause "so on other values each is a type error".
  - `:64`: the fix round wrote the prelude's `≣` as declared over `Any`.
- **"Reductions and comprehensions", `:130`:** the fix round wrote "fails" for "stops".

**Installed:**

- `:48`, `:57` and `:64` of "Traits and objects";
- "Reductions and comprehensions", whole: its one change is `:130`.

**Held** (the skill keeps its text): `:41` and `:43` of "Traits and objects".

The other five sections are the skill's text, byte for byte. The headings are unchanged.

**Why "Traits and objects" is split.** If the whole section were held, the skill would keep at `:57` a false sentence and its workaround: "The interpreter's library declares it for no type, and walk stops on it (row 184): write `a <-> b`." Row 184 is fixed (`e5cf04d474`; F-403), and P-180 drops the workaround. Key case 39 now grades that answer as the old text's (`key.md:650`). The changes at `:48`, `:57` and `:64` pass all three tests. `:41` and `:43` are separate lines, and none of the installed lines depends on them. In update mode, the held change is the one that is not made. Climb batch 35's judge split the section in the same way.

## What the reports cover, and what I checked myself

The reports were written on different texts:

- `preserve.md` (22:06), `cold-read.md` (22:11) and `quiz-grade-1.md` (22:18) were written on the first writer's text. That text changed only `:57`, without the type-error clause (`writer-1.log`).
- The fix round ended at 22:20 (`writer-2.log`). `quiz-grade-2.md` (22:24) and `cold-read-2.md` (22:25) were written on the final text.

So no preservation report covers the fix round. I read each line that the fix round changed against its source.

| Line in the final text | Source read | Result |
|---|---|---|
| `:57`, the admitted sentence: "The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only" | `preserve.md`, "The admitted finding"; `FortressLibrary.fsi:2793-2794`; F-403 | holds. `preserve.md`: 0 failures. |
| `:57`, the fix round's clause: "so on other values each is a type error" | F-403's headline and its two messages (walk: 'Unification error: ... EQV param 1 (a:Boolean) got arg Pt'; compiled: 'Could not check call to operator EQV'); the admission's suggested form and its mistake (c); `preserve.md`, note 1 | true for the interpreter's library, under walk and in a compile under the one library.<br>One reach is not stated. Until the switch-over, the prelude declares `NEQV` over `Any` (`CompilerLibrary.fsi:31`, `.fss:71`; row 1119), so `Pt(1) ≢ Pt(2)` compiles against the prelude.<br>Not a reason to hold: the clause hangs the type error on the interpreter's library ("so"); the admission sends row 1119 to the coordinator (P-180); and the error is on the safe side, since a worker who follows the clause writes neither operator on objects. Quiz round 2 noted the prelude's `≢` and did not grade it. |
| `:64`: "Its `≣`, declared as `===` over `Any`, follows `SEQV` but compares strings and `ZZ32`, `ZZ64`, `RR32` and `RR64` by `=`, not by bits or identity (row 908)." | `CompilerLibrary.fsi:30` (`opr ===(a:Any, b:Any)`); `.fss:63-69` (over `Any`, `jSEQUIV`, which is `equality.sEquiv`, `.fss:19`; at `ZZ64`, `ZZ32`, `RR64`, `RR32` and `String`, `a=b`; at `Boolean`, `a<->b`); `equalityRule.java:51` (a value object field by field); `compiler.md:98`; key case 39's runs (`SEQV`, `===` and `≣` on two `Pt` values compile and print `PASS` before the switch-over) | true. It repairs the cause of round 1's false side claim in case 39 (`quiz-grade-1.md`, case 39), and round 2 does not repeat it (`quiz-grade-2.md`, "Counts"). |
| `:48`: "In the library, and in your own generic over such a type that runs under walk or is checked against the interpreter's library, write `I extends Index`." The closing clause "write the bound only in code that ..." goes. | P-156; key case 22, **Expected** (a) and **Partial** | the same meaning. The condition now sits on the instruction, and the prelude sentence stays. No finding is lost. Climb batch 33b's queue offered this change as "the other way" (`climb-batch-33b/orientation/queue.md`). |
| `:130`: "A generic one fails at its first join." | `rung-reduction-types/REPORT.md:42-43`, `:53`: the stop is 'MethodClosure simpleJoin(...) has neither body nor def', an error at the call | true. "Fails" removes `cold-read.md` 2.14's second reading, an early end of the reduction. |
| `:41`: the cut of "A compiled body of `T` that returns `self` at `X` runs, also from an arm of a conditional or a `case` expression, a function expression or a local function." | key case 35's **Skill** (`key.md:479`): "the orientation is the reader's only source" for rows 1050 to 1052 and 1070; `quiz-cases.txt` (28, 39); climb batches 33b's and 35's judgements, which held the same cut | **preservation failure** (below) |
| `:43`: the cut of "and the bounds that the test reads ("Dispatch and overloading")" and of "so it loads such a pair" | key case 21's **Expected**, **Scope** and **Skill** (`key.md:252-262`); `orientation.md:13` (P-157's bounds sentence); F-318 by the key's citation; climb batch 35's judgement | **preservation failure, and a scope pointer lost** (below) |

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | no change | The skill's text. | `diff` |
| Dispatch and overloading | no change | The skill's text. | `diff` |
| Traits and objects | **install `:48`, `:57` and `:64`; hold `:41` and `:43`** | **`:57`, preservation:** F-403's rule is in the text, with its scope (the interpreter's library) and no compiled-run claim. The fix round's clause is checked above.<br>**`:57`, quiz:** case 39 is right in both rounds. Neither reader says that walk stops on `≡` of booleans, or requires `<->`. Round 2 read the final text.<br>**`:57`, second cold read:** it reads the sentence as intended: "never use `EQV`/`≡` on non-booleans" (part 1). It keeps the `≣`/`≡` naming (part 3, last paragraph). Its item 7 is on "`SEQV` follows the specification on both paths", which this update does not change (carried; climb batch 35's cold read, D).<br>**`:64`:** true (above). Round 2 has no false side claim. `cold-read-2.md` items 1 and 7 touch `:64`'s two markers and `:57`'s "both paths". Both are carried from climb batch 35 (its `cold-read-2.md` C and D). The new wording states the prelude's exception at `≣`, so it narrows item 7.<br>**`:48`:** the same meaning (above). `cold-read-2.md` item 3 (high that a worker cannot apply it) is on a program that both paths run before the switch-over. Climb batches 32 to 35 carried the same point at `:48`, and the held text has it too.<br>**`:41`, preservation failure left; its quiz case was not run:**<br>- The cut removes the sentence that key case 35's **Skill** names. That sentence is the skill's only statement that rows 1050 and 1051 are fixed (F-377).<br>- `cold-read.md` part 3 calls it repair history (medium). `cold-read-2.md` part 1 reads the new text right. But a cold read is not the case: case 35 was not run (`quiz-cases.txt`).<br>- This is the third update in a row to make this cut. Climb batches 33b and 35 held it for the same reasons.<br>**`:43`, preservation failure left; a scope pointer lost; its quiz case was not run; the second cold read flags the new wording:**<br>- "Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component" loses "so it loads such a pair". Key case 21's **Skill** names "its sentence that walk loads the pair in a program's own component" (F-318). Case 21 was not run.<br>- "With the reading of the exclusion test and the bounds that the test reads ("Dispatch and overloading")" becomes "By this reading of the exclusion test". The library's pair is valid only because the block's `T` is bounded by a number type, which the arrays exclude (key case 21, **Scope**; P-157's bounds sentence at `:13`). The new "this reading" points at the `self` reading alone. A reader can take a generic `+` bounded by the group alone as valid beside the group's own, which the checker refuses (`XXXExclusionSelfTypeSharedLeft`, by the key).<br>- `cold-read-2.md` item 9 (medium) flags two of the changed references: "Walk reads `self` in the same way" (as which reading?), and "refuses the valid pair (row 999)" (which pair?). The second lost its antecedent with "such a pair".<br>- The fix aimed at `cold-read.md` 2.5 (medium-low), the reading of "such a pair" as any pair of a program's own self-typed trait. The held text keeps 2.5, which climb batches 33 to 35 carried. | `preserve.md`; the check above; `quiz-grade-1.md` and `quiz-grade-2.md`, cases 28 and 39; `cold-read.md` 2.5, 2.9, part 3; `cold-read-2.md` part 1, items 1, 3, 7 and 9; `key.md:252-262`, `:276`, `:479`, `:650`; `quiz-cases.txt`; climb batches 33b's and 35's `judgement.md` |
| Static parameters, `where` clauses and sizes | no change | The skill's text. | `diff` |
| Numbers | no change | The skill's text. | `diff` |
| Reductions and comprehensions | **install** | **Preservation:** true (above).<br>**Quiz:** no case reads `:130`.<br>**Second cold read:** it reads the rule as intended: "type `simpleJoin` at `R`, never `Any` or untyped, and not copy the team's tests" (part 1). Its items 11 and 17 are on `:122` and on an empty `BIG MAX`, which this update does not change (carried). | the check above; `cold-read.md` 2.14; `cold-read-2.md` part 1 and items 11, 17 |
| Implementation limits | no change | The skill's text. | `diff` |

**The quiz, whole.** Cases 28 and 39 are right in both rounds; none is counted against the orientation. Round 2 read the final text and found no false side claim. Its one note, not graded: a reader hedged on row 923, which the key calls a design limit of the library. A later update could say so (`quiz-grade-2.md`, case 28). That sentence is unchanged here.

**The second cold read, whole.** Of its 21 items in part 2, four touch changed lines: items 1, 3 and 7 are carried points on the installed lines (above), and item 9 is on `:43`, which is held. None is on `:57`'s new sentence or on `:130`. So nothing that the update causes in the installed text would send a worker wrong.

## Decisions the writer left open

`writer-2.log`, "What I did not change", lists them. Each is on text that this update leaves as it was:

- **2.4, "Under walk, write `Byte(v.asZZ32)`" (`:99`).** Keep "Under walk". Climb batch 35's judge decided this (its decision 2): the prelude's `ZZ` has no `asZZ32` (row 349). Both cold reads raise it again (`cold-read.md` 2.4; `cold-read-2.md` item 8, medium). A consolidation could add the compiled path's form.
- **2.7 (row 1064), 2.8 (row 923), 2.10 (row 962), 2.1 to 2.3 (the markers), 2.6 and 2.16 (`RR64` and `QQ` on today's compiled path).** Carried to the next consolidation (below).

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 34,761 | 34,755 |
| `orientation.md`, whole | 34,594 | 34,586 |
| After (installed: `orientation.md` with the skill's `:41` and `:43`) | 34,787 | 34,779 |

By line, in bytes (characters in brackets where they differ):

| Line | Before | `orientation.md` | Installed |
|---|---|---|---|
| `:41` | 871 | 767 | 871 (held) |
| `:43` | 1,276 | 1,187 | 1,276 (held) |
| `:48` | 677 | 647 | 647 |
| `:57` | 479 (475) | 509 (503) | 509 (503) |
| `:64` | 937 (935) | 963 (961) | 963 (961) |
| `:130` | 477 | 477 | 477 |

The installed update adds 26 bytes (24 characters): `:57` 30 more, `:64` 26 more, `:48` 30 fewer.

**Size exceptions.**

1. **Carried.** The text is about 34,800 characters, against the workflow's budget of 8K to 12K (`explorations/coordinator/tools/orientation/README.md`). This update makes it 24 characters larger.
2. **New, and small.** The admission asked for `:57`'s change "at no greater length". The installed sentence is 28 characters longer. The fix round added "so on other values each is a type error" (`preserve.md`, note 1). That clause is in the admission's own form, and its mistake (c) names the type error. Without it, the type error is left to inference. So I accept the exception. `:48` pays for the same number of bytes.
3. **The conflict that climb batch 35 exposed stands.** The held cuts would save 193 bytes (`:41` 104, `:43` 89). The cold readers keep proposing them as repair history, and the key names both sentences. A cut of a sentence that a key **Skill** line names needs that case run first (`queue.md`).

## Carried, not caused by this update

These findings are on sentences that the update leaves as the skill has them, or that a hold returns to the skill's text. Holding a section would not remove them, so they are no reason to hold. The higher confidence comes first:

- `cold-read-2.md` item 1 (high) and `cold-read.md` 2.1 (high): a sentence with both "Until the switch-over" and a row (`:64`, `:110`, `:114`).
- `cold-read-2.md` item 3 (high that a worker cannot apply the lines; medium that one is sent wrong) and `cold-read.md` 2.6 and 2.9: the text never says which library a compiled program targets today (`:48`, `:112`, `:116`).
- `cold-read-2.md` items 2, 6, 7, 8, 10, 11, 12 and 13 (medium), and `cold-read.md` 2.2, 2.3, 2.4, 2.7 and 2.8.
- The rest of each cold read's part 2 (low or low-medium).
- Part 3 of each cold read. Two of its candidates are the cuts that this judgement holds. Each of the others needs a check against the key's **Skill** lines, and a run of the cases that name it. That is a consolidation run's work.

## For the install and the coordinator

- **Install.** The skill writer installs `orientation.md` with the skill's own `:41` and `:43` (34,787 bytes).
- **`sources-mapping.md`.** Add it to `references/sources.md` as a new dated entry, beside the text (`README.md`, "Installing its result"). Leave out what was held: in its "Fix round" list, the items "the self-typed trait" (`:41`) and "the paragraph on `self` in the overloading rules" (`:43`). Keep `sources.md:1129` as history, and let the new entry say that it replaces that line's `≡` clause. The standard asks to preserve the older entries and not rewrite them ("Sources audit and provenance during consolidation", item 3). `sources-mapping.md` says "replaces" instead.
- **The regression key.** `key.md` and `questions.md` are modified in the working tree and are not committed. Case 39's **Skill** (`key.md:650`) quotes the installed `:57`. Commit them with the install. Cases 21's and 35's **Skill** lines stay right, since `:41` and `:43` are held.
- **For the coordinator, not this workflow's to change:**
  - `Library/CompilerLibrary.fsi:42-43`, a comment in the original tree, says that "`opr ===` on `Any` is reference identity". It is stale: `.fss:63` binds it to `equality.sEquiv`, which compares a value object field by field (`equalityRule.java:51`). Reported by `writer-2.log`. Its home is a ledger row, or the prelude's switch-over, which deletes the file.
  - Row 1119 beside `:57`'s new clause (above). If the prelude's switch-over is not near, the wall can go in `compiler.md`'s list of the prelude's departures, not in the orientation (P-180).
  - The admission's "Outside the orientation" list (`interpreter.md:29`, `:80` and `:82`; `compiler.md:172`, `:174` and `:245`; `worktrees.md:36` and `:45`; `sources.md:1129`) is the skill writer's, at this install.
  - The held cuts: `queue.md`.
