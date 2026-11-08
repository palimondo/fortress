I brought the `fortress-repo` skill in line with the landing of climb batch 28 in two commits. Every changed file passes the skills lint. Nothing is pushed, and I did not touch the orientation folder's uncommitted quiz files.

## Commits
- `1baf51120` fortress-repo: install climb batch 28's orientation update after its landing (`revival-changes.md`, `sources.md`)
- `6415622f9` fortress-repo: bring the area parts in line with climb batch 28's landing (`SKILL.md`, `compiler.md`, `interpreter.md`, `records.md`, `sources.md`)

## Sections installed from the orientation
The judge marked two sections "install" and held none. `revival-changes.md` went from 24,152 to 25,123 characters.
- **"Numbers"**: the part had no rule for converting one integer type to another. It now has one. A getter (`asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asZZ`) keeps the value or raises `IntegerOverflow`. `narrow`, `widen`, `signed`, `unsigned` and `big` keep the low bits and never raise. `ZZ` has only `big`. The rule also says what the compiler's prelude lacks until the switch-over. Grounds: P-161, F-331, row 349.
  - The judged text said "has 8 of the 25 getters", which the lint flags. I wrote "has only 8 of the getters", the fix that the judgement gives as its default.
- **"Dispatch and overloading"**: in the Meet Rule paragraph, "but no other type can extend it" became "because no other type can extend it". Ground: `Specification/basic/types-vals-vars.tex:285-288`.

## Sentences changed
- **`interpreter.md`, "Natives", the list of carried types.** The list named only the writer trait. It now reads: "`JavaBufferedWriter` and `JavaBufferedReader`, the library's writer and reader traits, in `compiler/runtimeValues/FortressBufferedWriter` and `FortressBufferedReader`, which the checker reads back as the two traits." Ground: F-332, `StaticNativeApp.java:71`, `NamingCzar.java:455`.
- **`interpreter.md`, "Natives", a helper's raise.** The paragraph did not say that a raise can carry a message. It now adds: "A message can follow as a second argument, as for `FailCalled`." Walk's replacement object is now described as "without the message". Ground: F-336, `Utility.java:28-31`, `StaticNativeApp.raised`.
- **`compiler.md`, "The runtime".** The transaction was said to track only mutable variables. Added: "In the one library's arrays, which compiled programs use from the switch-over, it also tracks each element that the block touches, by array and index (`FortressArrayStore.java`, `TXReadSlot`, `TXWriteSlot`)." Ground: F-333, `FortressArrayStore.java:47-65`.
  - "From the switch-over" follows the review's Part 3, item 3: until the switch-over, compiled programs use the prelude's arrays.
- **`SKILL.md`, "Parallelism and mutable state".** Now: "the compiled code tracks each mutable variable, and from the switch-over each array element, that the block reads or writes". Ground: F-333.
- **`records.md`, "The repository's history".** The history commands fail in a shallow clone, and the part did not say so. New bullet: "In a shallow clone, these commits do not resolve, so the commands above fail. Then `git rev-parse --is-shallow-repository` prints `true`. Tell the team's files there by their copyright header, of Sun Microsystems or Oracle, as in `Library/Format.fss`." Ground: the review's process finding 4. This container's clone is shallow; I checked.
- **`compiler.md`, "The checker's time", step 4.** The step asked for a second count run even when the second pass changed nothing. It now opens "If the second pass changed code, run the count stage once more…" and ends "If it changed nothing, cite `change` as `pass`." Ground: process finding 9.
- **`compiler.md`, "Natives".** The citation "(ledger row 895)" pointed to a row that is now fixed. It became "(F-321)". The sentence's meaning still holds. Ground: the changed P-170.
- **`compiler.md`, its size.** It was 30,491 characters, and 30,794 after the changes above. It is now 29,995. I cut only text that states no rule:
  - two back references to `SKILL.md`;
  - "Which commands rewrite is below the list";
  - "Walk calls the same method by reflection", which `interpreter.md` already states;
  - the opening line of "The checker's gaps";
  - the 2012 history clause, `c35aac139`;
  - the two long example names of the transfer helpers;
  - the case of a result declared `UnsignedLong`, which the library does not have;
  - a sentence about suites that repeated the sentence before it.

## Lines already true, or not placed
- The changed C50, C51, C52, C54 and C56 match no sentence of the skill, so I changed nothing for them.

## Decisions not taken
- **Size of `compiler.md`.** I trimmed it. The other way is to move "The checker's time" into a part of its own. That would also change the coordinator skill's `batch.md:53` and `library.md:52`, which cite the section in `compiler.md`.
- **The prelude's `DOTPLUS`.** Step 3 of the judgement's install proposes a sentence: until the switch-over, the prelude's `DOTPLUS` saturates, its `BOXPLUS` wraps, and it has no `DOTTIMES` (row 348). This landing's list of false sentences does not include it, so I did not add it. It could go in `library.md`'s wrapping bullet or in `compiler.md`'s prelude section.

## For the coordinator
- **Another skill:** the `cloud-container` skill's `references/container-loss.md` does not mention the shallow clone after a rebuild. The review proposes `git fetch --unshallow origin`, which nobody has tried.
- **Size budget:** `revival-changes.md` is now 25,123 characters, against a budget of 8,000 to 12,000. This is the fourth update in a row to pass it. The judge asks you to settle this before the next update adds to the part.
- **The judge's other way for the lint hit:** an `ALLOW` entry in `skills-lint.py`. I did not take it.
- **Process findings 1 to 3, 5, 6, 8 and 10 to 12** are about how agents and scripts work. They are for the batch script, the coordinator skill and `spend.py`, not for this skill.
---
session d082e56d-c744-4f7b-a99b-f9a51a19f35c turns 86 cache writes 119962 reads 6150917 output 28658 labels {'ephemeral_1h_input_tokens': 119838, 'ephemeral_5m_input_tokens': 0}
