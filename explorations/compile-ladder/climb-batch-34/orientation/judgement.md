<!-- Climb batch 34's orientation judgement (update mode, run 1 of CLIMB-BATCH-34.md): for the whole text and for each section of orientation.md, whether its change is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, and the size before and after. All installed; one paragraph changes, F-225's row 1094 departure in "Traits and objects". -->

# Climb batch 34: judgement of the orientation update

Judged: `orientation.md` in this folder. This is the writer's text after the fix round (`writer-2.log`), 33,955 bytes. It is judged against `.claude/skills/fortress-repo/references/revival-changes.md` on `main`. That file is 33,434 bytes, and it last changed at `52b7f33e6a`. `main` is still at the admission's base, `b802d2e6fd`.

The standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance".

The reports read:

- `admission.md`, `preserve.md`, `cold-read.md` and `cold-read-2.md`;
- `quiz-grade-1.md`, `quiz-grade-2.md` and `quiz-cases.txt` (cases 21 and 38);
- `sources-mapping.md`, `writer-1.log` and `writer-2.log`;
- case 38 of the regression key (`explorations/coordinator/tools/orientation/regression/key.md:590`). The key is modified in the working tree and is not committed.

Nothing was built or run.

## Verdict

**Whole text: install.**

A `diff` of the two files changes one line, `:43`. It is the paragraph after the rule "In a self-typed trait the checker types `self` as the trait met with the implementing type", in "Traits and objects". That paragraph's first two sentences named one exception to the plain reading of `self`. They become five sentences that name two exceptions:

- the exclusion test (P-157), as before;
- a departure: an object redeclares an abstract dotted method of `T` at the same parameter types, and the checker refuses a narrower return type there (row 1094). The sentences then give walk's behaviour and the workaround.

Also, "With this reading" becomes "With the reading of the exclusion test". The rest of the paragraph is the skill's text, and so are the other five sections and the opening, byte for byte. The headings are unchanged.

## What the reports cover, and what I checked myself

`preserve.md` was written on the first writer's text (`writer-1.log`; `preserve.md` 21:04, `orientation.md` 21:20). No preservation report covers the fix round. So I read the final `:43` against its sources:

| Point in the final text | Source read | Result |
|---|---|---|
| `preserve.md` failure 1: the getter workaround. It now reads "For a method without parameters, you can declare both methods as getters instead: the pair then compiles with the narrower type." | `OverloadingChecker.scala:725` (`val getters = isGetter(o._1) && isGetter(p._1)`) and `:728` (`getterArrow` only then); `compiler_tests/SelfTypedGetterNarrowedReturn.fss` (`getter g(): Number` in the trait, `getter g(): ZZ32 = 3` in the object, with `compile`, `link`, `run`) | repaired. The text names both sides and no parameters, which is the measured form. This is the wording that `preserve.md` proposed. |
| `preserve.md` failure 2: the measured scope. The text now says "an abstract dotted method of `T`". | `compiler_tests/XXXSelfTypedMethodNarrowedReturn.fss` (`g(): Number` with no body); `admission.md`, "Points for the writer", item 1; key case 38, **Open** ("a concrete method in the trait" is not measured) | repaired. |
| "That type is the object's own, so each return type must be a subtype of the other." This is new in the fix round and answers `cold-read.md` item 20. | `OverloadingChecker.scala:214` (`toMethodArrows` takes `selfType.unwrap`) and `:732-734` (`returnTypeCheck` both ways when `equal`); `OverloadingOracle.scala:83-90` (the rule is checked where one domain is a subtype of the other, so equivalent domains are checked in both directions); `admission.md`, F-225's row ("equivalent to the object, and checks the pair both ways") | true, and within the admission's scope |
| "Declare the object's method at `T`'s return type", and "which walk runs" | row 1094's notes, as the admission quotes them; key case 38, this update's runs (the method at `Number` compiles and prints `PASS`, and walk runs the form as written) | preserved |
| The rest of the paragraph: the array-and-number pair, walk's reading, row 999's two cases | `diff` | unchanged, apart from the antecedent "the reading of the exclusion test" |

**The writer's decision not taken ("abstract").** The writer asked whether to keep "abstract" or to drop it and use the wider scope that F-225 and Appendix I give. Keep it. The test measures only an abstract method, and the admission asks for the measured scope. The key's **Open** lists a concrete method in the trait as unmeasured. `preserve.md` reads the code as probably refusing a concrete method too, but nothing has measured that. If a worker meets that form, the row cited in the sentence leads to the record.

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | no change | The skill's text. | `diff` |
| Dispatch and overloading | no change | The skill's text. | `diff` |
| Traits and objects | **install** | **Preservation:** F-225 is in the text with every condition the admission names (object, dotted, abstract, same parameter types, narrower return type, walk runs it, P-146 and P-157 kept as the rule, `:32` left alone, row 879 left out). Both `preserve.md` failures are repaired (above).<br>**Quiz:** both rounds answered cases 21 and 38 right, with nothing counted against the orientation. Round 2 read the final text. In case 38, its reader placed the refusal on the compiled path, called it the departure on record, gave the passing getter pair and the `XXX` form, and kept the switch-over out of it. In case 21, neither reader took the new departure to make the library's pairs invalid. That was the risk that the key names for this update.<br>**Second cold read:** no item is on the new sentences. Its reading of them is the intended one: "When an object redeclares an abstract dotted method of a self-typed `T` at the same parameter types, I use `T`'s return type, or getters for a method with no parameters (row 1094)." Its item on `:43` (part 3, item 2) is about the library-validity sentence, which is the skill's text. | `preserve.md`, "Failures" and "Checked, no failure", with my check above; `quiz-grade-1.md` and `quiz-grade-2.md`, "Counts" and "Case 38: right" / "Case 21: right"; `cold-read-2.md`, part 1 ("Traits and objects") and parts 2 and 3 |
| Static parameters, `where` clauses and sizes | no change | The skill's text. | `diff` |
| Numbers | no change | The skill's text. | `diff` |
| Reductions and comprehensions | no change | The skill's text. | `diff` |
| Implementation limits | no change | The skill's text. | `diff` |

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 33,434 | 33,428 |
| After (`orientation.md`, installed whole) | 33,955 | 33,949 |
| Line `:43`, before and after | 617 and 1,138 | 617 and 1,138 |

The update adds 521 bytes. The first writer added 324 bytes, and the fix round added 197 more.

**Size exceptions.** There are two:

1. **Carried.** The text stays about 34K characters, against the workflow's budget of 8K to 12K (`explorations/coordinator/tools/orientation/README.md`). This update makes it larger.
2. **New.** The admission asked for one sentence or one clause of about 300 characters. The change is five sentences and 521 bytes. The extra 197 bytes came from the fix round's three repairs: "abstract", "both methods as getters" with "for a method without parameters", and the sentence on why the refusal follows. Each answers a report finding. Cutting the first two would bring back a preservation failure, and the third is the one point of the first cold read on the new text. No report found a clause here that changes no action.

The cold reads' part 3 lists the candidates for a cut elsewhere in the text. Each candidate needs a check against the quiz key first. That is the work of a consolidation run.

## Carried, not caused by this update

These findings of the two cold reads are on sentences that the update leaves as the skill has them. Holding the section would not remove them, so none is a reason to hold. `writer-2.log` left them as "What I could not place". They are listed with the higher confidence first:

- `cold-read-2.md` 2.2 (0.6) and `cold-read.md` item 5: `I extends Index` in a program that both paths run before the switch-over (`:48`). Climb batches 32, 33 and 33b carried this too, and 33b queued it with its held section.
- `cold-read-2.md` 2.1 (0.6): `:74`, P-51 against row 705. Is walk's behaviour there the rule or a departure?
- `cold-read-2.md` 2.3 and `cold-read.md` item 3: "the compiler's library" and "the compiler's prelude" are used as one name.
- `cold-read.md` items 1 and 2 and `cold-read-2.md` 2.4, 2.6, 2.10 and 2.13: the opening's two classes of row sentence (`:7`), and sentences that carry a row or a switch-over limit and fit neither class, or fit both.
- `cold-read.md` item 4: does a program's own self-typed trait with a functional `+` still need `excludes { Number }` (`:24` against `:43`)? Climb batches 33 and 33b carried this. `writer-2.log` names it as a question for the curator. It touches the changed paragraph, but not its new sentences.
- The rest: `cold-read.md` items 6 to 19 and 21 to 24, and `cold-read-2.md` 2.5, 2.7 to 2.9, 2.11, 2.12 and 2.14 to 2.20.
- Part 3 of each cold read. The library-validity sentence at `:43` (`cold-read.md` part 3, item 3; `cold-read-2.md` part 3, item 2) is a candidate for a cut. But both quiz readers of case 21 based their right answer on it (`quiz-grade-1.md` and `quiz-grade-2.md`, case 21). So a cut needs case 21 run again.

## For the install and the coordinator

- Add `sources-mapping.md` to the skill's `references/sources.md`, beside the text (`README.md`, "Installing its result"). All four of its rows are on the installed text.
- Key case 38's **Skill** (`key.md`, case 38) quotes the first writer's wording: "a dotted method of `T`", and "or as a getter". When the key is committed, align it with the installed wording: "an abstract dotted method", and both methods as getters, for a method without parameters. The key and `questions.md` are modified in the working tree and are not committed (`git status`).
- The admission's "Outside the orientation" lists points for other parts. None of them is this workflow's to change:
  - `compiler.md:53` and `:55` (F-325);
  - `compiler.md`, "The checker's gaps": rows 1093, 1094 and 1097, and the getter check;
  - `library.md`, "Designing a change": rows 1095 and 1096;
  - `interpreter.md`, "Natives" (F-395);
  - `sources.md:890` and `:954`, whose line numbers moved;
  - a possible quiz case on row 1094, which case 38 now is.
