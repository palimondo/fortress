I brought the `fortress-repo` skill in line with climb batch 33b's landing in two commits. I did not push. Lint gave no hits on any changed file. The working tree's uncommitted `key.md` was not touched.

**Commits**
- `4c5a5f121e` fortress-repo: install the orientation update for climb batch 33b's landing
- `f4d63205c7` fortress-repo: bring the parts in line with climb batch 33b's landing

**Sections installed from the orientation** (`revival-changes.md`: 33,294 bytes before, 33,216 after, as the judge measured)
- **The opening, the sentences on ledger rows.** The old text told the reader not to assert an unsettled behaviour as correct in a plain test. It then said where a plain test asserts that behaviour, which reads as a contradiction. Now it gives two instructions: if the rules decide the case, assert their answer in an `XXX` test; if they do not, assert today's behaviour in a plain test and cite the row. The rule is the same.
- **"Numbers", the rule that the number types are flat siblings.** The old text said that the compiler's prelude declares the seven number types as traits that a type can extend. It also said that the checker accepts an object below one, and that the object dies when its class loads. Now: both libraries declare the seven as value objects, and the prelude declares no `QQ`. Both paths refuse such an object declaration; the compiled checker says 'Invalid type in extends clause: ZZ32'. This also covers the review's two points on that sentence.
- **"Numbers", the rule that `Number` declares nothing.** The `h = 0.5` example for a `QQ` was said to hold "on both paths". The prelude has no `QQ`, so it is now scoped to walk.
- **Held:** "Traits and objects" keeps its old text, as the judge ruled.
- `sources.md` has the provenance lines for the installed sections. I left out the mapping's two rows for the held section.

**Other sentences changed** (second commit)
- **`SKILL.md`, "The compiled runtime".** It said "`RR64` is the class `FRR64`". Now: "an `RR64`'s class extends `FRR64`, which holds the `double`." Ground: F-388; `FRR64.java:22-23`.
- **`compiler.md`, "What the two paths share".** It named `FZZ32` and `FRR64` as the compiled values. Now it adds "which the classes of the prelude's number objects extend." Ground: F-388; both classes are now abstract over `FValue`.
- **`compiler.md`, "The compiler's prelude".** It said "a brief may ask to declare each built-in number type as one `value object`". This is now done in the prelude, so it reads "it declares each built-in number type as one `value object`". Ground: F-388.
- **`compiler.md`, "What the compiled path cannot compile yet".** Two additions:
  - A new list item: a built-in number type named as a value, with the message 'Can't compile the number type ZZ32 as a value yet' (row 1082).
  - A new paragraph on varargs. Against the prelude a varargs parameter is refused. With `FORTRESS_LIBRARY=one` it compiles, except a varargs method or a generic varargs function beside another declaration of the same name with as many parameters (row 1086). The fix is to give it its own name. Ground: F-390; `NamingCzar.java:1028-1034`.
- **`compiler.md`, the type assumption's refused forms.** A fourth form is added: a method of a generic trait whose parameter has the trait's type parameter, 'Can't find the body that …' (row 1088). A new sentence says that a call at an assumption runs the trait's body, also over the object's override (F-391).
- **`compiler.md`, "Traps of the compiled path".** Six traps are added:
  - After row 963's line: a `typecase` clause at a type that the selector's static type excludes is refused as unreachable (row 1081).
  - The prelude `String`'s placeholder comparisons answer `false` at an assumption (row 1089, the new row that the data calls "C44's row"; `CompilerBuiltin.fss:393-398`).
  - A tuple argument at a parameter of type `Any` stops the code generator; bind it first (row 1080).
  - A function argument coerced to an arrow type of no parameters dies when called (row 1084).
  - A spread argument is dropped on both paths (row 1085).
  - A matrix type such as `RR64[n,n]` at a declared return type crashes the checker until the switch-over (row 1087).
- **`revival-changes.md`, "Numbers", the rule on argument conversion.** It said walk converts any value other than a numeral at a call. A new sentence: "Nor does walk convert a function argument by an arrow coercion: 'Unification error' (row 1083)." Ground: row 1083; F-128.

**Already true, or not placeable**
- The review's two points on the old number-types sentence were made true by the installed "Numbers" section.
- The two changed decisions (on P-33 and P-178): no sentence of the skill rests on the old words. A `git grep` for F-353, row 866 and "second set of" finds nothing. I changed nothing.
- The boot-note item, the batch script's push item and the process-findings item are not about this skill. I left them for you.

**Decisions not taken**
- **Where walk's arrow-coercion gap goes.** I put the row 1083 sentence in `revival-changes.md`, because the false sentence is there. The alternative is `interpreter.md:18-31`, which the orientation's admission proposes. Choosing it would keep the orientation's size budget free.
- **Where the excluded-type `typecase` trap goes.** The row 1081 sentence sits in the numerals sub-list, after row 963, as the review asked. The alternative is a bullet of its own, since the refusal is not only about numerals.

**For you, the coordinator**
- The orientation's admission names `compiler.md:208`: the count stage's "about 80 to 180 seconds" is now about 65 seconds (F-240). It also names walk's half of row 1085 for `interpreter.md`. Neither was in my data, so I left both.
- The judge's carried wording point, to open the new "Numbers" sentence on `QQ` with "Until the switch-over", is for the orientation's next update.
---
session eddc35c4-2a8a-49a0-a120-146f2711f544 turns 46 cache writes 89873 reads 2916083 output 15494 labels {'ephemeral_1h_input_tokens': 89805, 'ephemeral_5m_input_tokens': 0}
