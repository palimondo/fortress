I fixed 11 of the cold reader's 13 flags in one commit and left 2. Lint gave no hits, and nothing is pushed.

**What a worker would have got wrong, and what the text now says**

- **`SKILL.md`, "The compiled runtime".** A worker on the one library would assume that its `RR64` class also extends `FRR64`. The record holds this only for the compiler's prelude, so the sentence now opens "under the compiler's prelude".
- **`compiler.md`, the prelude's section.** The second exception had become a statement of fact. It also included a status clause ("the form that both libraries are to take"). A worker could not tell which prelude declarations the exception still allows. It now reads "its seven number types are each one `value object`, as in the interpreter's library". That also leaves out `QQ`, which the prelude does not declare.
- **`compiler.md`, varargs.**
  - "It compiles one" could be read as "compiles with the one library". A worker might also expect such a program to run. The text now says that it compiles a varargs parameter, but such a program does not run yet.
  - Row 1086's stop gave no message and no count rule. It now names `OptionUnwrapException`, and says that the varargs parameter counts as one parameter. I checked the count in `CodeGen.partitionByMethodArgCount` and the row's test.
- **`compiler.md`, the type assumption's fourth refused form.** The example showed only the declaration, so a worker could not tell which call is refused. It now gives the refused call from row 1088: `stamp(Q asif Tagged[\String\], s asif String)`.
- **`compiler.md`, the sentence on a trait's body at an assumption.** I deleted its "(F-391)" citation.
- **`compiler.md`, the unreachable `typecase` clause.** A worker had no remedy and did not know why the clause is refused. The text now says that a number type is an object, so it excludes every trait that it does not extend. It then says to delete such a clause, because no value of the selector's type can reach it.
- **`compiler.md`, string comparisons.** Read alone, the trap said that every compiled string comparison answers `false`. It now says that a string value is a `JavaString`, whose own declarations compare correctly (`CompilerBuiltin.fss:420-430`). Only a call at an assumption runs the trait's placeholder.
- **`compiler.md`, the arrow coercion of no parameters.**
  - "Dies when called" was ambiguous. It now says that the program dies when the callee calls the function.
  - It also says that at one parameter the coercion runs, from row 1084 and `ArrowCoercionFnExprCompiled.test`.
- **`compiler.md`, the spread argument.** "Dropped on both paths" did not say what is lost, or where the compiled path shows it. It now says that the call passes none of `ys`'s elements: walk drops them, and so does the checker with `FORTRESS_LIBRARY=one`.
- **`revival-changes.md`, argument conversion.** "Arrow coercion" was not defined, and the sentence gave no remedy.
  - It now gives row 1083's example: `inc: ZZ32 -> ZZ32` passed at `f: ZZ32 -> ZZ64`.
  - It adds the remedy: declare the function at the parameter's arrow type.
  - I did not take the proposed clause "the compiled path fails on it too". Row 1083 says the compiled path converts a function of one parameter.

**Commit**
- `52b7f33e6a` fortress-repo: the cold read of climb batch 33b's landing

**Flags left, with the reason**
- **`compiler.md`, the trait's body at an assumption: does walk do the same?** The record does not settle this for an object's override. Row 1088 gives walk's answer only for its generic case, and row 941 gives a walk crash for another case.
- **`revival-changes.md` opening: the proposed rule "assert today's behaviour in no plain test".** This text was installed word for word from the orientation. Its judge ruled that splitting it into two cases keeps the old ban. Adding the sentence back would undo that judged rewrite.

**Decisions not taken**
- **The ban on a plain test beside an `XXX` test.** There are two ways:
  - Restate the ban in a later orientation update.
  - Keep the two-case form, as the judge accepted it.

**For you, the coordinator**
- The cold reader flagged F-N citations as having no meaning in `compiler.md`. Other F-N citations stay in that part, such as F-321 and F-378. Whether a part should cite FACTS entries at all is a question for the whole skill, not for this round.
---
session eddc35c4-2a8a-49a0-a120-146f2711f544 turns 17 cache writes 20009 reads 902457 output 8375 labels {'ephemeral_1h_input_tokens': 19993, 'ephemeral_5m_input_tokens': 0}
