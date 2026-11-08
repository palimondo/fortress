I took all 16 of the cold read's flags and left none. The fixes are in one commit, `623d6912d` (fortress-repo: the cold read of climb batch 28's landing), and it is not pushed. The lint passed on every changed file.

## What a worker would have done wrong, and what the text says now
- **Array tracking in `atomic` (`SKILL.md`; `compiler.md`, "The runtime").** A worker could not tell whether elements are tracked today. A worker editing `FortressArrayStore.java` would not know which path runs it, or how to test the edit.
  - `SKILL.md` now says it in two sentences: variables are tracked today, and array elements from the switch-over.
  - `compiler.md` now names `TXReadSlot` and `TXWriteSlot` as the transaction's methods. It also says that walk does not run this class, so an edit of it is tested with `ArrayStoreJUTest`, beside it (F-333).
- **"Helper" (`compiler.md`, "What the two paths share").** The word was used before the part defined it. It is now defined there: the public static methods of classes under `nativeHelpers/`.
- **Two warnings I had cut (`compiler.md`, "Natives").** Without them, a worker could not explain a `parse` or `api` test whose result changes inside a suite. A worker might also expect a transfer helper on a result declared `UnsignedLong`. Both sentences are back.
- **Step 4 of "The checker's time" (`compiler.md`).** "Cite `change` as `pass`" could be read two ways. It now says: if the second pass changed nothing, run neither, and report `change`'s results in place of `pass`'s.
- **A helper's raise with a message (`interpreter.md`, "Natives").** A worker had to search for the example, and could not tell whether a helper may raise `FailCalled`.
  - The sentence now names `nativeHelpers/runtime.java:53`, which raises it.
  - `FailCalled` joins the list of exceptions that a helper may raise. It is declared as an object in both libraries: `FortressLibrary.fsi:1209` and `CompilerLibrary.fsi:66`.
- **The shallow clone (`records.md`, "The repository's history").** The check came after the failure it explains. A worker could also credit the team with lines that the Java 9 port or the revival wrote.
  - The text now says: if the history commands fail, run the check.
  - A Sun or Oracle copyright header marks a file that the team made, not which of its lines were changed later.
  - If the task needs those lines, the worker says in the report that the clone is shallow.
- **The integer conversion rule (`revival-changes.md`, "Numbers").**
  - "All five" and "of the five" could mean the getters or the functions. They now say "functions".
  - "Under walk" is now "In the interpreter's library".
  - The call form is shown as `x.asZZ32`, so a worker will not write `asZZ32(x)`.
  - The fixed-width types are named (`ZZ32`, `ZZ64`, `NN32`, `NN64`), with each low-bits function's result type, which I checked in the library.
  - `z` is now said to be a `ZZ`.
  - The `bitsAs…` getters are now said to equal `unsigned` or `signed` (F-331), so a worker need not choose between them.
  - The prelude's 8 getters are listed: `asZZ` on each fixed-width type, `asZZ32` on `ZZ32` and `ZZ64`, `asNN32` on `NN32`, and `asNN64` on `NN64`. I checked them in `CompilerBuiltin.fsi`.

## Each flag
- S1, `SKILL.md` line 123: fixed, with the flag's own text.
- C1, `compiler.md` line 26: fixed, with "helper" defined in place.
- C2 and C3, `compiler.md` line 74: fixed in one restated sentence and one new sentence. Grounds: F-333, `Transaction.java:208` and `:293`.
- C4 and C5, `compiler.md` "Natives": fixed by restoring both sentences that I had cut.
- C6, `compiler.md` step 4: fixed, with the flag's own text.
- I1, `interpreter.md` line 128: fixed. Grounds: `runtime.java:29` and `:53`, and the two declarations of `FailCalled`.
- R1 and R2, `records.md` line 116: fixed. For the missing step, I chose to have the worker report the shallow clone.
- V1 to V6, `revival-changes.md` line 93: fixed. Grounds: F-331, and `FortressLibrary.fsi`, `FortressBuiltin.fsi` and `CompilerBuiltin.fsi`.

## Sizes
- **`compiler.md`** is 29,999 characters. The restored sentences would have taken it back over 30,000. To keep it under, I cut five passages that state no rule:
  - the notes' date, "September 2026";
  - the reason given for the quick loop;
  - the smoke test's second example;
  - the sentence on how the linker looks for a component;
  - the words that said where the abbreviated type comes from.
- **`revival-changes.md`** grew from 25,123 to 25,456 characters, because the clearer conversion rule is longer.

## Decisions not taken
- **The shallow clone, when a task needs the revival's lines:** I wrote "say in your report that the clone is shallow". The other way is `git fetch --unshallow origin`. I did not write it, because nobody has tried it here.

## For the coordinator
- **Size budget:** `revival-changes.md` is now further over its budget of 8,000 to 12,000 characters. The judgement asks you to settle this budget before the next update adds to the part.
- **`compiler.md` length:** it is 1 character under 30,000. Any new sentence will push it over, unless "The checker's time" moves into a part of its own. That move would also change `coordinator`'s `batch.md:53` and `fortress-repo`'s `library.md:52`, which cite the section.
---
session d082e56d-c744-4f7b-a99b-f9a51a19f35c turns 29 cache writes 31899 reads 2343050 output 16278 labels {'ephemeral_1h_input_tokens': 31869, 'ephemeral_5m_input_tokens': 0}
