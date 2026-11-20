The `fortress-repo` skill now matches climb batch 34's landing. I made two commits and did not push. The lint found nothing in the changed files.

## Commits
- `dc425262b4`: puts the orientation's judged text into `revival-changes.md`, with its lines in `sources.md`.
- `8439760919`: fixes `compiler.md` and two line numbers in `sources.md`, with their lines in `sources.md`.

## Changes, with reasons
1. **`revival-changes.md`, "Traits and objects", the paragraph after the rule on `self`.** The judge marked this section "install", and I copied it word for word. The paragraph named one place where the checker reads `self` another way, and there are two. It now also says this: where an object redeclares an abstract dotted method of a self-typed `T` at the same parameter types, the checker refuses a narrower return type, which walk runs. The fix is to declare the method at `T`'s return type, or to make both methods getters if the method has no parameters. Grounds: F-225, row 1094, F-394. The file went from 33,434 to 33,955 bytes.
2. **`compiler.md`, the type assumption paragraph.** It said that only a call where every argument is an assumption compiles. Now it says that a call of an overloaded function of its own component compiles, also when only some arguments are assumptions. That call dispatches on the other arguments' run-time types, as walk does. Grounds: F-325, row 818.
3. **`compiler.md`, the refused forms.** The first item gave one message for every partial call, overloaded functions included, which is no longer true. It is now three items:
   - A partial call keeps the old message, 'Can't compile a dispatched call whose arguments are not all type assumptions', in four forms: a functional method, an overloaded method on an assumed receiver, a dotted call with an assumption at an argument, and a call whose dispatch would hold a functional method.
   - Such a call with a generic declaration at or below the resolved one gets 'Can't compile a type assumption at some arguments but not all of a call that a generic declaration can take yet'.
   - A call of another component's overloaded function gets its own message. I read all three messages in `CodeGen.java`.

   Grounds: F-325, row 818.
4. **`compiler.md`, "The checker's gaps", the Return Type Rule item.** The skill did not say that the checker applies the rule to a pair of getters, or that it skips the getters and dotted methods of an object expression. It says both now, and points to `revival-changes.md` for the case of row 1094. Grounds: F-394, rows 1097 and 1094.
5. **`compiler.md`, "The checker's gaps", a new item.** The checker refuses `x.n()` when `x`'s type variable is bounded by another type variable, and walk runs the call. The workaround is to bound the variable by the trait. Ground: row 1093.
6. **`sources.md`.** Two lines of `Library/FlatString.fss` moved up by two: `:45` is now `:43` and `:121-128` is now `:119-126`. I checked both against the file.

The file `compiler.md` went from 42,973 to 44,203 bytes.

## Already true, left as they were
- **`revival-changes.md:32`** ("The checker checks that an overriding return type is a subtype"). It says nothing about getters, and the orientation admission said to leave it alone.
- **`interpreter.md`, "Natives", and F-395.** I added no line. No sentence of the skill names a native object as a value, and no worker's action depends on the new behaviour.
- **The curator's decision P-102.** Its words did not change, so no sentence in the skill changed.

## Choices and decisions not taken
- In item 3, I kept "assumed receiver" and "a dotted call's argument" as separate items, because two tests cover them. Merging them into one dotted-call item was the alternative.
- I did not list the refusal for a functional method whose `self` is not first ('Can't compile a type assumption at a functional method whose self is not its first parameter yet'). Row 818 names it, but the data does not.

## For the coordinator
- `library.md`, "Designing a change": the orientation admission points rows 1095 and 1096 there. The landing's list does not name `library.md`, so I left it alone.
- `sources.md:876` still says that `Library/FlatString.fss` has 158 lines. It has 156 now. The data does not name this line.
- Case 38 of the regression key (`key.md`) still quotes the first writer's wording, not the installed text. The key is not committed.
- Shell commands with a `$` variable in them were refused for approval, so I used the Edit tool for those changes.
---
session ed4ad157-a88c-4076-9417-f6658a508f1c turns 35 cache writes 68045 reads 2186478 output 13346 labels {'ephemeral_1h_input_tokens': 67989, 'ephemeral_5m_input_tokens': 0}
