<!-- Climb batch 31b's orientation judgement (update mode, run 2 of climb batch 31): the review-queue items for the sections it held, one per section, in the form of explorations/coordinator/review-queue.md. No section was held, so it files no item; the notes below are for the coordinator. -->

No section was held, so there is no item to file.

For the coordinator, not an item:
- **Three corrections at the install** (`judgement.md`, "The corrections"):
  1. the opening keeps "as correct" and the gloss "one without the `XXX` prefix", beside the new sentence on what an `XXX` test asserts;
  2. "Numbers" keeps the two sentences on the compiled `ZZ32` power (rows 441 and 523), which the fix round cut and the writer asked to have confirmed;
  3. "Numbers" gets back the blank line before "**`/` on two integers answers a `QQ`.**".

  The first two put back the skill's own words. The install's cold read of the installed part reads all three. `sources-mapping.md` needs the changes that `judgement.md`, "At the install", lists.
- **`QQ` and P-178.** P-178 says "no type of a program extends a built-in number type", on the ground that "an object is a leaf". `QQ` stays a trait, with `comprises { ... }` (`Library/FortressLibrary.fsi:394-397`). Walk's refusal at load fires only below an object (`DesugarerVisitor.java:1398`, `:1435-1436`), and `preserve.md`'s probe of `object Mine extends QQ` was refused only by the cover check (P-147). The installed text limits walk's refusal to the seven value objects. It keeps P-178's sentence for every number type, `QQ` included. Whether P-178 covers `QQ` is a question on the decision (`preserve.md`, failure 2; `writer-2.log`, "Questions left open"; the key's case 36, **Open**). No item of the review queue holds it: items 514, 516, 518, 519 and 577 name P-178 but not `QQ`. Filing it is the coordinator's choice; the default is P-178 as written.
- **`excludes { HasRank }` for a number type below `Number`** (`orientation.md:24`). `HasRank` declares `excludes { Number, AnyMaybe }` (`Library/FortressLibrary.fsi:1341`). So, by reading, a type below `Number` already excludes the arrays, and the clause adds nothing there. The key's case 36, **Scope**, makes the opposite reading ("unless it excludes the arrays"), also without a run. A run under walk of a program's trait below `Number` with its own functional `+`, with and without the clause, settles which sentence is right. For the next orientation round.
- **Rows 441 and 523** belong in `compiler.md`, "Traps of the compiled path", too. Once they are there, a consolidation can cut them from the orientation.
- **`revival-changes.md:70`**, older than this landing: the prelude's `===` at `RR32` calls `=`, which overflows the stack (row 528). The admission leaves it to the coordinator (`admission.md`, "Outside the orientation").
