I took 13 of the cold reader's 14 flags and left one. The fixes are in commit `2dd2936b4e` on `main`, not pushed. The lint found nothing in any changed file.

`revival-changes.md` grew from 34,527 to 34,761 bytes. It was already well over the orientation's budget, and the judge recorded that before this round. Most of the growth comes from four pointers and warnings that the cold read asked for.

## Each fix, with its reason

- **`SKILL.md`, "Fortress as a language", static parameters.**
  - Wrong before: it stated the new rule as if the tree already followed it, and its two "where"s read two ways. A worker would write `Byte(v)` and meet walk's refusal.
  - Now: "a `nat` or `int` parameter used as a value is a `ZZ32`; a numeral coercion's static parameters follow their own rule". It sends the worker to "Numbers", which gives the rule and the tree's departure together.
- **`compiler.md`, "What the compiled path cannot compile yet", `override`.**
  - Wrong before: "where a static parameter is involved" was vague and gave no message. A worker could not tell whether their `override` compiles.
  - Now: it names the two refused forms with their exact messages. The first is an `override` of or by a method with static parameters of its own. The second is one in a generic trait or object where the parameter types, or the overridden declaration's, name a static parameter. The source is row 1106 and `CodeGen.java:1204-1213`.
- **`revival-changes.md`, the opening.**
  - Wrong before: "has no row yet" left a worker unsure what to cite. "Yet" was also a status word.
  - Now: "A departure that cites a FACTS entry (F-N) in place of a row is known too: test it as one that cites a row, and cite the entry."
- **`revival-changes.md`, "`override` widens".**
  - Wrong before: after the old departures were deleted, nothing warned that the code generator still refuses some `override`s.
  - Now it adds: "The code generator refuses some forms where static parameters take part (`compiler.md`, row 1106)."
- **`revival-changes.md`, "Numbers", the coercion paragraph.**
  - "The four static arguments… without the `NN32` bound of a size" counted only one form and used a term that the skill never defines. It now reads "The static arguments of either form are naturals of any size."
  - "The body computes from them and invokes no method" seemed to forbid the walk form that the same paragraph gives, `Byte(v.asZZ32)`. I deleted it. "So `Byte`'s body is `Byte(v)`" still states the rule.
  - "Is refused statically where it does not fit" did not say what is refused. It now reads "A numeral whose number does not fit there is refused statically."
  - The walk form no longer says "today". It now says that the getter raises `IntegerOverflow` outside `ZZ32`'s range, which the install had dropped.
  - "At compile time or when the class loads" left a worker unsure whether the compile or the run fails. It now reads "when the class loads, before `run()`", with a pointer to `compiler.md`, "What the code generator does".
- **`revival-changes.md`, "`Number` declares nothing".**
  - Wrong before: a worker would write `asFloat(x)` in a compiled program against the compiler's prelude, which has no `asFloat`.
  - Now it adds: "Until the switch-over, the compiler's prelude has no `asFloat` (`compiler.md`)."
- **`tests-writing.md`, the superscript.**
  - Wrong before: after my first task, the part said nothing about a superscript after a subscript.
  - Now: "It can follow a dotted access or a subscript: `p.wq^T` is `(p.wq)^T`, and `x[5]^2` is `(x[5])^2`." The source is row 1, which is fixed, and `tests/SubscriptThenSuperscriptWalk.fss`.

## Each flag

| Part and passage | Done | Ground |
|---|---|---|
| `SKILL.md`, static parameters, the two "where"s | Fixed, as proposed | P-173, P-174 |
| `SKILL.md`, static parameters, the tree's departure left out | Fixed by the same restatement | `revival-changes.md`, "Numbers" |
| `compiler.md`, "involved" read two ways | Fixed, with the exact forms | Row 1106; `CodeGen.java:1206-1212` |
| `compiler.md`, no message given | Fixed, both messages quoted | `CodeGen.java:1207`, `:1211` |
| `revival-changes.md`, opening, what to cite for an F-N | Fixed | Cold read's restatement |
| `revival-changes.md`, "under walk" in "`override` widens" | **Left** | See below |
| `revival-changes.md`, no pointer to the code generator's refusals | Fixed | Row 1106 |
| `revival-changes.md`, "the four", the `NN32` bound | Fixed | P-174 |
| `revival-changes.md`, "invokes no method" | Deleted | The flag's fix |
| `revival-changes.md`, what is refused statically | Fixed | P-174 |
| `revival-changes.md`, the compiled form, `IntegerOverflow` and "today" | Partly fixed | See below |
| `revival-changes.md`, "compile time or class load" | Fixed | `compiler.md`, "What the code generator does" |
| `revival-changes.md`, `asFloat` on the prelude | Fixed | `compiler.md`, "Traps of the compiled path" |
| `tests-writing.md`, superscript after a subscript | Fixed | Row 1; walk test; the old text said that `x[5]^2` compiles |

**Left: "So under walk a Java-style `override` in the library stops every program."** The record does not say what such an `override` does to a compiled program. The checker refuses it, but rows 1107 and 1108 show that it misses some forms. The judge also installed "under walk" deliberately, as a repair. The alternatives are:
- drop "under walk";
- add a clause on the compiled path once a run checks it.

**Partly fixed: the compiled form of `Byte`'s body.** I fixed the `IntegerOverflow` note and the word "today". I did not say what a compiled program should write. The checker's refusal of `Byte(v)` is inferred, not tested. The judge also recorded that the prelude's `ZZ` has no `asZZ32` (row 349). The record does not settle this. The alternatives are:
- say "On the compiled path no form is checked";
- leave the paragraph as it is until a test settles it.

## Decisions not taken

- **When the compiled path computes the value.** P-176 allows a constant fixed at compile time or a value filled when the class loads. The text now states only what the tree does: the class's static initializer, before `run()`. If the curator wants the rule kept beside the tree, the alternative is "by the rule at compile time or when the class loads; the code generator does it when the class loads".
- **Whether a worker adds a ledger row for a departure that cites an F-N.** The record says that a later planner files these rows. The text now says to cite the entry, and says nothing about adding a row. The alternatives are "Add no ledger row for it" or "Add its ledger row."

## Points for the coordinator

- The record does not settle what a compiled program writes in a numeral coercion's body. A compiled test of `Byte(v)` and of `Byte(v.asZZ32)` against each library would settle it.
- `revival-changes.md` now stands at 34,761 bytes, which adds to the size exception that the judge recorded for the orientation.
---
session bed16152-b613-456d-aa0b-3825f2bde4c1 turns 15 cache writes 16867 reads 940412 output 9602 labels {'ephemeral_1h_input_tokens': 16851, 'ephemeral_5m_input_tokens': 0}
