I fixed 15 of the cold reader's 19 flags and left 4, and committed the fixes as `efcb7f924f`, not pushed. The lint has not run on this commit: the shell asked for approval for `skills-lint.py` and none was given. The cold reader's lint of the earlier text had no hits, but nobody has linted the new wording.

## What changed, and why

**`revival-changes.md`**
- **The opening:** a worker who met a ledger case that the rules do not decide found three different instructions. The text now says: where the rules do not decide, a plain test asserts today's behaviour beside the row (`tests-writing.md`, "How a defect is recorded").
- **"Dispatch and overloading":** "for a number type below `Number`" could be read as one of the library's number types. It now says "where the trait itself extends `Number`".
- **"Traits and objects":** a worker who met the refusal of row 1037 had nowhere to look. The sentence now points to `compiler.md`, "The checker's gaps", which gives the form.
- **"Numbers", first change:** "Seven are value objects" read as true on both paths, but the compiler's prelude still declares the seven as traits. It now opens "In the interpreter's library". "No type of a program extends a number type" read as either a fact or a rule. It is now an instruction: "Do not extend a number type in a program."
- **"Numbers", second change:** the sentences on the team's removed type names named no path. They now say "On both paths". The message comes from the type disambiguator (`TypeDisambiguator.java:376`), which both paths run, and row 959 covers both paths.
- **"Numbers", third change:** "write `ZZ32`, `ZZ64`, … in that order" could be read as the order in which to write `typecase` arms. It now pairs each name: `ZZ32` for `Int`, `ZZ64` for `Long`, `RR64` for `Float`, `ZZ` for `BigNum` and `NN64` for `UnsignedLong`.

**`compiler.md`, "Traps of the compiled path"**
- **The tuple parameter:** "Read a `VerifyError` … with this in mind" named no step, and "still" was repair history. It now says that the method's descriptor in a `VerifyError` lists each element of a tuple parameter as a parameter of its own (F-378).
- **An object whose one value parameter is a pair:** "a second value parameter" could mean splitting the pair. It now gives the row's working form, `object Holder(n: ZZ32, var pr: (ZZ32, ZZ32))`.
- **A generic operator applied to a pair:** the passage had no example and no action. It now gives the row's example, `pr!!` for `opr (x: T)!![\T\] : T = x`, and says to write no such call in a compiled program.
- **A block that ends in a numeral:** it was unclear what is bound without a type and which use fails. It now says that the variable without a declared type is bound to the block. The failing conversion is shown as `y: ZZ32 = x`, from row 1060.

**`interpreter.md`**
- **"What walk checks", row 697:** "every parameter … is an object type" did not say in which list. It now says "in one of them", as the row and `OverloadedFunction.java:511` have it.
- **"Natives":**
  - The refusal in a method of a type that walk cannot carry now says "a type whose `self` walk does not carry".
  - "the lists" pointed to a list that no longer exists. It is now "the list above".
  - `WriteStream` was used without saying what it is. It is now "the library's trait of an output stream (`Library/Stream.fsi`)".

`sources.md` has one new section for these fixes.

## Flags left as they were

- **"Traits and objects", the cover search at the limits:** the record does not say whether the checker refuses or accepts an object there. So the outcome is unknown, and I cannot state it.
- **"Traits and objects", `MIN` and `MAX` in a type that runs compiled:** the orientation's judge checked that the instruction holds before and after the switch-over. Adding the period would add words without changing an action.
- **`reflect` before the switch-over:** the orientation's judge accepted the cut of what a compiled call does today. Putting it back would undo an accepted change.
- **`interpreter.md`, the valid pair with a tuple result:** the same section already says that a library edit which adds an overload can stop every program at load.

## Decisions not taken

- **A program's type that extends `QQ`:** the record does not say what either path does with it. Choices:
  - leave the text as it is;
  - state P-178 as covering `QQ`;
  - run a probe and record a ledger row.
- **The example of walk's refusal over a program's own trait that comprises one object (`interpreter.md`):** no open ledger row holds it, and it has not been run. Choices:
  - open a ledger row and cite it;
  - cut the example;
  - keep it as it is (my choice for now).

## For the coordinator

- **The lint** has not run on `efcb7f924f`.
- **Each commit message** ends with the two footer lines from my standing brief, as it requires.
- **The `QQ` question and the missing ledger row** above are yours to settle.
---
session 8a29b6b4-75e0-485e-a008-a20f885f831b turns 27 cache writes 24612 reads 2273769 output 10834 labels {'ephemeral_1h_input_tokens': 24586, 'ephemeral_5m_input_tokens': 0}
