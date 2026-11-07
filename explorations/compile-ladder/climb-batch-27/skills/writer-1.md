I brought the `fortress-repo` skill in line with climb batch 27's landing in two commits. Both pass `skills-lint.py` with no hits. I did not push.

## Commits

- `eb0dfd81a` fortress-repo: climb batch 27 landing, install the orientation update
- `6d6142f3c` fortress-repo: climb batch 27 landing, area parts brought in line

## Sections installed from the orientation

The judge judged three sections "install" and none "hold". I checked with `diff` that `orientation.md` differs from the old part only in those three sections, so I copied it whole. `revival-changes.md` grew from 20,192 to 22,974 characters. The judge accepted the size overrun.

- **Dispatch and overloading.** The old text did not warn about this. A program's trait with its own functional `+` must exclude `Number` or arrays, or walk refuses the program at load. The same holds for `-`, `MIN` and `MAX`.
- **Traits and objects.**
  - The old text did not say what `=` does when a type declares none. It now says that `=` is then `SEQV`: a value object compares field by field, and a string only to itself.
  - It also says where to write the `I extends Index` bound until the switch-over.
- **Numbers.**
  - The old text gave an example that walk now prints differently. It now says that walk prints `Cell[\ZZ32\]` for a value that is a `Cell[\Int\]`.
  - New rule: `Number` declares nothing. Generic code over `T extends Number` can call nothing on a `T`.
  - New rule: two numbers of different types are `=` only through a coercion. Otherwise the answer is `false`.

The new `sources.md` section, "Climb batch 27's update", holds the provenance.

## Sentences changed

- **`interpreter.md`, "Natives", first list.** The list did not name the writer trait, which walk now carries. Added: "`JavaBufferedWriter`, the library's writer trait, in `FortressBufferedWriter`." Ground: F-330, checked against `StaticNativeApp.javaFor`.
- **`interpreter.md`, "How walk evaluates a program"** (a new trap):
  - The judgement measured this trap and sent it to this part.
  - New text: "Walk keeps a float numeral bound to `RR64` as a `FloatLiteral`, a type of its own, so `SEQV` finds it unequal to a computed `RR64` of the same bits (F-326). For `value object V(f: RR64)` with no `=` of its own, and `x: RR64 = 0.25 + 0.25`, `V(0.5) = V(x)` is `false`, and so is a tuple of four or more elements that holds such a numeral. Give the value object its own `=`, or compare the parts."
  - Ground: F-326 and the judge's run under walk.
- **`tests-writing.md`, the `assert` bullet.** The old text said "compare by identity", which is wrong for a value object. Now: "Otherwise they compare by `SEQV`: a value object field by field, any other object by identity (ledger row 807)." Ground: F-326, P-168.
- **`compiler.md`, "What the code generator does".** The old text said that `value` changes nothing in the class. Now: "The `value` modifier adds the mark interface `ValueObjectMark` to the object's class. The compiled `SEQV` reads the mark. The fields stay as they are." Ground: F-326, `CodeGen.java:4527-4531`.
- **`compiler.md`, "What the compiled path cannot compile yet".** The old text did not say that `asif` now compiles. New paragraph:
  - The code generator compiles `e asif T` at a dotted call's receiver, at a call whose every dispatched argument is an assumption, and as a value.
  - It refuses three forms, each listed with its message: a partial dispatched call, a generic method on an assumed receiver, and an overloaded generic function.
  - Ground: F-325, row 818, `CodeGen.java:6419-6423` and `:6620`.
- **`compiler.md`, "The checker's time".** "about 150 seconds" is now "about 80 to 180 seconds". Ground: F-240.
- **`sources.md`, the curator's order on branches.** "from this container" is now "from a container", at the curator's word of 06:31, relayed in `batch-27-review.md`, Part 3.

## Already true, or nothing to change

- **`revival-changes.md:80`** (the `Box[\Int\]` sentence). The installed "Numbers" section already makes it true.
- **The six changed decisions (P-160, P-163, P-165, P-166, P-167, P-168).** No sentence of the skill rests on their old words. The skill's citations of P-160, P-165 and P-168 agree with the new texts.

## Decisions not taken

- **Refused `asif` forms.** Row 818 and `CodeGen.java:6577` and `:6588` show two more:
  - a call of another component's overloaded function;
  - a functional method whose `self` is not first.

  I listed only F-325's three. The alternative is to add the two as bullets.
- **The `FloatLiteral` sentence.** The landing's list of false sentences does not name it, but the judgement's install step 4 sends it to `interpreter.md`. I added it on that ground. The alternative is to remove it and leave it for the next orientation update.
- **A program type named `JavaBufferedWriter`.** By the code, walk would carry it by its name alone, as row 877 records for `FlatString`. No entry records this, so I added nothing.

## Points for the coordinator

- **Another skill:** `cloud-container`'s `references/machine.md:14` is false. The disk was filled by the worktrees' `test-caches` and `tmp/`, the main tree's `tmp/`, the pip and uv caches, and the git object store. That skill's own writer should fix it.
- **Size of the part:** `revival-changes.md` is now 22,974 characters, against a budget of 8,000 to 12,000. This is the third update in a row over the budget. The judge asks you to choose a consolidation or a new budget before the next update.
- **Uncommitted files:** the judge says that the quiz changes in `regression/key.md` and `questions.md` go with this batch's orientation folder. They are still uncommitted.
- **Quiz case 28:** its "Skill" line still names a pointer to `tests-writing.md` that the new text removed. It should name the row 807 sentence.
- **A fault of the data:** the bullet quoted from `diff.md` is a summary of `owed.md`, not a list of sentences. All of the items were in `owed.md`.
---
session 2ad7e3a6-b63d-4651-abaf-8ccf3e515e2c turns 56 cache writes 79014 reads 3393032 output 16930 labels {'ephemeral_1h_input_tokens': 78932, 'ephemeral_5m_input_tokens': 0}
