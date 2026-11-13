<!-- Climb batch 30's orientation judgement (update mode): for the whole text and for each section of orientation.md, whether it is installed in the fortress-repo skill's references/revival-changes.md or held, with the reason, the report line it rests on, and the size before and after. -->

# Climb batch 30: judgement of the orientation update

Judged: `orientation.md` in this folder (the second writer's text, 29,237 bytes) against `.claude/skills/fortress-repo/references/revival-changes.md` on `main` (29,117 bytes). Standard: `explorations/reviews/revival-record-synthesis.md`, "Acceptance and maintenance". Reports read: `admission.md`, `preserve.md`, `cold-read.md`, `cold-read-2.md`, `quiz-grade-1.md`, `quiz-grade-2.md`, `sources-mapping.md` and the two writers' logs.

## Verdict

**Whole text: install, with one section held.** Six of seven sections are installed; "Static parameters, `where` clauses and sizes" keeps the skill's text.

The admitted finding, F-341, is in the installed text with its conditions, and both quiz readers answered case 33 right.

## What the reports cover, and what I checked myself

- `preserve.md` was written after the first writer's round, when the only change was one deleted sentence. The second round changed sentences in every section, and no preservation report covers those.
- I therefore read a word diff of the whole text against the skill's, and checked each changed claim against its source. Nothing was run.

| Changed claim | Source read | Result |
|---|---|---|
| Return Type Rule "at every instance that the argument types allow" | POSITIONS, P-45 | supported |
| Row 780: walk compares "at each call, not at load" | `interpreter.md:57`; ledger row 780 | supported |
| Self-typed traits: "In two cases walk does not read `self` so" | FACTS, F-318 ("are not read so and keep the refusal") | supported |
| `pick((1, 2))` example with row 663 | ledger row 663 | supported |
| `u = 0` is `false` under walk, with the binding as the way round | ledger row 973; `interpreter.md:23` | supported; the row is `CONTESTED` |
| `asFloat(self): RR64`, `isInfinite` | `Library/FortressLibrary.fsi:304`, `:322` | supported |
| `t TIMES 10.0` is `Infinity` under walk | the regression key, case 33, its probe | supported, under walk only, as the text says |
| "so write their static arguments", for the three `Bottom` cases | ledger rows 587, 612, 591 | **not supported for row 591** |

## Per section

| Section | Verdict | Reason | Rests on |
|---|---|---|---|
| The opening | install | Changes are a rewording and one cut pointer, which `SKILL.md:204` already gives. | `cold-read-2.md` 2.14 (medium): "plain test" is `tests-writing.md`'s term, and the text points there. |
| Dispatch and overloading | install | Each changed claim is supported. The second cold read's items here are on text that the update did not change. | `cold-read-2.md` 2.1, 2.6, 2.7, 2.8, 2.17 |
| Traits and objects | install | Each changed claim is supported. Item 2.2 (high) asks for a ledger row for the two self-typed cases; none exists, and the skill's text had none either. The new sentence says plainly that the pair is valid and walk refuses it. | `cold-read-2.md` 2.2, 2.9, 2.18; `writer-2.log`, "Could not place", first item |
| Static parameters, `where` clauses and sizes | **hold** | "so write their static arguments" is given for all three `Bottom` cases. Row 591 gives no such way round and the writer did not run one. Row 591's own reproducer, `pick2(Apple, Cherry)`, has no named type below both bounds to write. The second cold reader took the instruction for all three. | `writer-2.log`, "Could not place", second item; `cold-read-2.md` section 1, "Static parameters", first bullet; ledger row 591 |
| Numbers | install | Both preservation failures are repaired: "when the place runs", the message tied to a top-level binding, "and the numeral" gone. Both quiz readers were right. The second cold read's items here are on text that the update did not change. | `preserve.md`, failures 1 and 2; `quiz-grade-1.md` and `quiz-grade-2.md`, "No failed case"; `cold-read-2.md` 2.4, 2.5, 2.10 to 2.13, 2.19, 2.20 |
| Reductions and comprehensions | install | The bold sentence is reworded with the same content. | `cold-read-2.md` 2.21, 2.22 (both low, unchanged text) |
| Implementation limits | install | Two cuts. The second cold reader still drew the cut sentence's conclusion. | `cold-read-2.md` section 1, "Implementation limits", third bullet |

### One addition beyond the admission

"Numbers" gains two sentences on how to get an infinity and on `isInfinite`. `admission.md` admits only F-341. I install them: the regression key's case 33 marks a reader with no way to an infinity as partial, the first quiz reader found no passage for it (`quiz-grade-1.md`, first note), and the second used it (`quiz-grade-2.md`, first note). The claim is limited to walk, which is what the probe ran.

### What the hold loses

The held section's other changes are not made either: the `pick` example's object and row 663, "ignore the condition" for row 774, the `N[\nat n\]` gloss, and the cut of the size's descriptor. `queue.md` carries them.

## Size

| Text | Bytes | Characters |
|---|---|---|
| Before (the skill on `main`) | 29,117 | 29,109 |
| `orientation.md` as written | 29,237 | 29,231 |
| After, as judged (six sections new, one old) | 29,146 | 29,140 |

**Size exception.** The text stays at about 29K, against the workflow's budget of 8K to 12K characters. The skill's text was already there; this update does not consolidate. The judged text is 29 bytes larger than before: the infinity rule adds about 170, and cuts pay for the rest.

## Carried, not caused by this update

These findings of the second cold read are on sentences that the update left as the skill has them. Holding a section would not remove them, so they are no reason to hold. They are listed for the next orientation round.

- 2.9: "A function over `Index` and one over a tuple of `Index` types do not exclude each other." The first cold reader concluded from it that such a pair must not be written (`cold-read.md`, "Traits and objects"); the sentence does not say whether the pair is valid.
- 2.12: "a compiled `7 / 2` is a static error" uses an expression of numerals alone, which folds before the checker.
- 2.8: "Both paths refuse" in the P-152 paragraph, against row 416 in the next section.
- 2.4, 2.5, 2.13: a whole quotient of numerals; a numeral at a parameter beside a declaration that fits; a numeral at a declared return type under walk.
- 2.1: "instance" where the core says "instantiation".
- 2.6, 2.7: `excludes { Number }` or `excludes { HasRank }`, and whether a trait that extends `AdditiveGroup` still needs it.

Outside the orientation: `references/interpreter.md:24` still gives `Infinity` and row 967 as current, and `references/compiler.md` on row 442 may be stale (`quiz-grade-2.md`, notes). `admission.md` lists these for the skill writer.
