<!-- The orientation workflow's judgement of climb batch 26's update, update mode: install or no change for the opening and each of the six sections of orientation.md, after the fix round, the second cold read and the second quiz; "Traits and objects" installs with F-318's edit (walk loads the self-typed pair in a program's own component, two exceptions, row 804 dropped) and the fix round's two clarifications there; four sections install one-sentence wording fixes from the first cold read; no section is held; the sizes and the size exception; what the install needs (the sources.md lines in the same commit, interpreter.md:53 by gather.1); findings on unchanged text, for the next update. Read at `d7a03f34f`, where `revival-changes.md` is the admission's base text (no commit touches `.claude/skills/` after it), and orientation.md is the fix round's text of 00:25 UTC. -->

# Climb batch 26's update of the orientation: the judgement

Mode: update.

**What I read.** In this folder: `orientation.md` (final text), `admission.md`, `sources-mapping.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `quiz-cases.txt` (case 21), both writer logs. The current part, `.claude/skills/fortress-repo/references/revival-changes.md`, and its `diff` against `orientation.md` (seven hunks: lines 28, 39, 43-46, 70, 82, 98, 102). Ledger rows 804 (`fortress-gap-ledger.md:414`, FIXED `c41c3d2b0`), 893 (`:417`) and 894 (`:502`). `OverloadedFunction.java:809-867` (`traitMethod`, `selfTypeParameter` and its comment). The standard, `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

**What I ran.** Reads, `grep`, `diff`, `wc`, and `skills-lint.py` on a scratch copy of `orientation.md` laid out as the part: no hit, exit 0. Neither writer could lint, so this is the text's only lint.

**Which text each check read.** `preserve.md`, `cold-read.md` and `quiz-grade-1.md` read the first text (19,999 characters); `cold-read-2.md` and `quiz-grade-2.md` read the final text (20,151). Line numbers below are those of the final text.

## Verdicts

| Part | Lines | What changed | Verdict | Rests on |
|---|---|---|---|---|
| The opening | 1-7 | nothing | no change | none |
| Dispatch and overloading | 9-24 | nothing | no change | none |
| Traits and objects | 26-54 | line 43-46 (F-318): walk loads the pair in a program's own component too, with two exceptions, row 804 dropped; line 39: the definition's second branch given an example; line 28: walk's row 416 behaviour reworded | install, all three changes | `preserve.md`, "Checked and kept" (F-318's rule and both exceptions kept, row 804 removed); case 21 right in round 2, right-without-qualification in round 1 with the cause in `interpreter.md:53`, not the orientation (`quiz-grade-1.md`, "Cause"; `quiz-grade-2.md`, "Cause": "No failure"); `cold-read-2.md` section 1, "Traits and objects", read right |
| Static parameters, `where` clauses and sizes | 55-75 | line 70: "compiles" becomes "accepts" (cold-read item 11) | install | `cold-read-2.md` section 1, "Static parameters", fourth bullet, read right; no finding on line 70 |
| Numbers | 76-87 | line 82: "differ only at the positions of the call's numerals" (item 9) | install | `cold-read-2.md` raises nothing on line 82 |
| Reductions and comprehensions | 88-99 | line 98: "The team's tests declare `simpleJoin` so" (item 10) | install | `cold-read-2.md` section 1, "Reductions", third bullet ("never at `Any` or untyped. I would not copy the team's tests here"), read right |
| Implementation limits | 100-104 | line 102: the bold rule split; walk runs the checker after the switch-over stated as a plan (item 3) | install | `cold-read-2.md` section 1, "Implementation limits", third bullet, read right |

The whole text installs: the current part with the seven hunks above. No section is held, so `queue.md` files no item.

### Traits and objects: install

**The change at lines 43-46.** Old: "Walk loads the library's pairs, but refuses such a pair where a program's own component declares both (row 804)." New: "Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component. Walk's load check, which is not the verdict ("Dispatch and overloading"), still refuses the pair in two cases:" a trait self-typed only through another, and a method with static parameters of its own.

**Against the sources.** F-318 and the admission name exactly these two exceptions. The code agrees: `traitMethod` (`:814-817`) takes only a method with no static parameters of its own; `selfTypeParameter`'s comment (`:836-844`) says "a parameter bounded by another self-typed trait that the trait extends at it is not read", which is also the source of the line 39 example `trait T[\X extends U[\X\]\] extends U[\X\]`. Row 804 is FIXED at `c41c3d2b0`, so the old sentence is false; keeping it (a hold) would keep a false sentence that sends a worker to an `XXX` test, the key's Wrong answer.

**Preservation.** Both failures in `preserve.md` lie outside the orientation's text; the text itself loses nothing.
- Failure 1 (`sources.md:819` still cites row 804's refusal): the replacement lines are drafted in `sources-mapping.md`, "Proposed line for `sources.md`". The standard asks that guidance and its source mapping be published together ("Acceptance and maintenance"; "Sources audit", step 6), so the install applies them in the same commit. With that, failure 1 is closed.
- Failure 2 (`interpreter.md:53` still states row 804's refusal; rows 893 and 894 in no skill file): the admission sends rows 893 and 894 there, and PLAN's gather.1 of climb batch 26 owns the edit. It is the cause of round 1's partial grade. It does not count against this text, and a hold would not cure it: the old orientation sentence agrees with the stale line, and both are false. The install should land with, or right before, gather.1's correction of `interpreter.md:53`, so that the two parts do not contradict each other on `main`.

**Second cold read on this section.** Its item 3 (the two refusals cite no ledger row, so the reader cannot tell departure from rule) is on the new text. It does not send a worker wrong: the sentence names them walk's load check, "not the verdict", and the reader's action (section 1: not to use walk's check as evidence, look the case up in `interpreter.md`) and both quiz readers' actions (avoid both shapes in a walk test) are right. Whether the two refusals are departures the checker does not share, needing a row, is a ledger question for gather.1 (see "Findings", item 2). Its item 1 (`override` against row 650, high) is on line 32, unchanged text; a hold keeps the same sentence, so it goes to "Findings on unchanged text".

### The four one-sentence fixes: install

Each is a wording fix from `cold-read.md`, section 2, that keeps the meaning (`sources-mapping.md`, "Changed in the fix round"), and the second cold read reads each right and raises nothing on it. Line 102's new form ("It is to run the checker only after the switch-over (P-12)") answers the first cold read's item 3 and is P-12's plan as written.

## Size

- Before: 19,839 characters (`revival-changes.md` at `d7a03f34f`). After: 20,151 characters (+312: F-318's edit about +160, the fix round's two additions in "Traits and objects" about +110, the rest about even).
- **Size exception.** The budget is 8,000 to 12,000 characters (`tools/orientation/README.md`; the synthesis, "Choose a provisional budget"). The part was already over it before this update, and climb batch 24's judge already accepted the same exception, then the third update in a row to do so. The growth here is a needed correction (a false sentence replaced by the rule and its two exceptions), not new content, and no sentence could be cut for it without stranding an exception. The exception is accepted for this install. The budget conflict stays the coordinator's to settle: a consolidation that moves the path departures to the area parts (the second cold read's section 3 lists candidates), or a new budget. Per the standard, the conflict is exposed here rather than met by compressing the prose.

## The install

1. Copy `orientation.md` over `.claude/skills/fortress-repo/references/revival-changes.md` (its first lines already read as the part, so `cold-read.md` item 1 lapses on install).
2. In the same commit, replace `sources.md:819`'s line with the two lines in `sources-mapping.md`, "Proposed line for `sources.md`", and add the fix round's mapping (that file's "Changed in the fix round") as a dated entry. This closes `preserve.md` failure 1.
3. Land gather.1's correction of `interpreter.md:53` (row 804 FIXED; rows 893 and 894 under "What walk checks") with or before this commit. This closes `preserve.md` failure 2 and the cause of `quiz-grade-1.md`'s partial grade.
4. The writer's open choice, P-152 cited in the part beside P-157 or only in sources: kept only in sources, as written. The paragraph cited only P-157 before, and `preserve.md` finds nothing lost.

## Findings on unchanged text, for the next update

None is an item, because no section is held; a hold keeps the same sentences.
1. **`override` widens (line 32) against row 650** (`cold-read-2.md` item 1, high; `cold-read.md` item 5): the compiled path refuses every `override`, and the text does not say what to write when a widening must compile.
2. **Departures that cite no row** (`cold-read-2.md` items 3 and 11; `cold-read.md` items 2 and 7): walk's two remaining refusals of the self-typed pair (lines 45-46), walk's tuple-order refusal (line 53), the duplicates sentence naming only the checker. For the first, the ledger may need a row if the checker accepts what walk refuses; gather.1 can settle it with rows 893 and 894.
3. **The P-152 `o` example** (`cold-read-2.md` item 4): it rests on the unstated point that `Box[\T\]` forces one shared instance.
4. **`IntLiteral` under walk (row 578)** (`cold-read-2.md` item 5, `cold-read.md` item 8): unclear what it refers to.
5. **Reductions: "lifts" and "a generic one stops at its first join"** (`cold-read-2.md` items 7 and 8).
6. **`comprises` example, `Integral[\I\]` below `AnyIntegral`** (`cold-read-2.md` item 9).
7. **Wrapping, `ZZ64` and `Index`, "Working Draft", "instance"** (`cold-read-2.md` items 12-14; `cold-read.md` items 12-15): low.
8. **History to cut in a consolidation** (`cold-read-2.md` section 3): route C, the Working Draft half of the `Index` tuple sentence, the base-0 power crash, the second `NatReflect` reason.
