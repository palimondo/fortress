I fixed most of the cold read's flags in one commit, `044e3fb29`. It passes `skills-lint.py` with no hits. I did not push. I did not re-run any program under walk: every new example comes from the judge's earlier walk run, the code, or a ledger row.

## What a worker would have done wrong, and what the text now says

**`compiler.md`**
- **The count stage's time.** The text gave 80 to 180 seconds and then said that this is longer than the Bash tool's limit. That is false at 80 seconds, so a worker could run the stage in the foreground and have the tool stop it at 120 seconds. It now says: "It can run past the Bash tool's 120-second limit, so run it in the background."
- **The type assumption (`e asif T`).** A worker did not know what `asif` does. It also could not tell which calls the code generator refuses, because the text spoke of "dispatched arguments" and dispatch is on every argument. The text now:
  - defines the assumption from the specification;
  - says that a call of a functional method or an overloaded function must have an assumption at every argument or at none;
  - names each refused form by the call it appears in.
- **The `value` mark.** The text now names where the compiled `SEQV` is, `nativeHelpers/equality.java`. It says that the modifier does not inline or unbox the fields; "The fields stay as they are" could be read two ways.

**`interpreter.md`**
- **The `FloatLiteral` trap.** A worker could not tell whether the `false` answer is a defect to record or the correct answer. It now says that the `false` follows the rule that values of different types are never equivalent, and that no ledger row holds it.
  - The trap now holds where the numeral is bound to an `RR64` variable, parameter or field.
  - The tuple case is now a written example, `(y, 1, 2, 3) = (x, 1, 2, 3)`, with its reason: the library declares `=` on pairs and triples only.
  - The remedy now adds `Equality[\V\]`. Without it, a test that uses `assert(a, b, msg)` still gets `false` under walk.
- **The writer's carrier.** A worker would have had to search for the Java class. The text now gives its path, `compiler/runtimeValues/FortressBufferedWriter`, and says that the checker reads it back as `JavaBufferedWriter` (`NamingCzar.java:454`, `:491`).

**`tests-writing.md`**
- **The `assert` bullet.** The row 807 citation stood at the end of the `SEQV` clause. A worker could read the `SEQV` answer as the defect and write a test that asserts `true`. The citation now stands on the fact that the row records. For `SEQV` itself, the bullet points to `revival-changes.md` and no longer restates the rule in a shorter form.

**`revival-changes.md`**
- **"Traits and objects", the `SEQV` rule.**
  - **Integers, characters and booleans.** A worker could not predict `V(3) = V(3)`. The list now says that an integer, a character or a boolean compares by its value. Source: `objects.tex:443-449` and `equalityRule.java`.
  - **Reference object.** The term was not defined. The text now says "an object not declared `value`".
  - **Strings "built apart".** This phrase is now an example: `V(s) = V(t)`, where `s` and `t` are equal strings made by two computations. The tuple case has its own example, `(s, 1, 2, 3) = (t, 1, 2, 3)`.
  - **Walk's float numerals.** A worker who read only this part expected `V(0.5) = V(x)` to be `true` under walk. The part now says that under walk a float numeral is a `FloatLiteral`, and points to `interpreter.md`.
  - **`===`.** A worker did not know what it is. It is now defined as the ASCII spelling of `SEQV` (`operators.tex:419`).
- **"Traits and objects", the `Index` bound.** I merged the two sentences on where to write the bound, which removed "now".
- **"Dispatch and overloading".** "`Number` is open" did not say why the trait overlaps the library's `+`. It now says: "a type can extend both the trait and `Number`, which has no `comprises` clause". The same fact in "Numbers" became "A program may also declare its own number type below `Number`."
- **"Numbers".**
  - **Printed names.** "The traits' names" had no clear meaning. The text now says that walk prints the classes as `ZZ32`, `ZZ64` and `ZZ`.
  - **The `Cell` example.** It now gives an action: "Where you need a `Cell[\ZZ32\]`, write `Cell[\ZZ32\](3)`." This follows row 364's workaround. I removed "still".
  - **`=` across number types.** A worker could not predict `=` between a `ZZ32` and a `ZZ64`. The text now says that the library declares `=` for each coercion pair, so a `ZZ32` and a `ZZ64` of equal value are `=` (`FortressLibrary.fss:780`).
  - **Generic code.** "The function" could mean two things. It now says "declare your function once for each number type".

## Flags left as they are

- **A program's trait that excludes arrays** (medium). The library's array type is the generic `Array[\T,I\]`, and the record has no measured form of an `excludes` clause for it. The fix that works, `excludes { Number }`, can already be written from the text.
- **A `JavaBufferedWriter` as `self`** (low). The flag is wrong: walk carries it in `FortressBufferedWriter` (`javaForSelf` falls through to `javaFor`), so the sentence is true.
- **The checker's refusal of "such a pair in one component"** (low). Row 918 uses the same words. I could not confirm the proposed reading from the record.
- **The `Cell` declaration and what "prints" means** (low). The proposed fix uses `println`, and I did not check that.
- **The `=/=` and `assert` sentences repeated from `tests-writing.md`** (low). Deleting them would take the fact out of the part that every code task reads whole.
- **Whether a compiled program can reach `SEQV` before the switch-over** (part of a low flag). The record does not settle it.
- **`x = 0.5` for a computed `x`, and two equal string literals.** Nothing measures either case, so I stated neither.

## Decisions not taken

- **Where the `FloatLiteral` fact lives.** It is now in `interpreter.md`, with a one-sentence pointer in `revival-changes.md`. The alternative is to keep it in `revival-changes.md` alone, which every code task reads, at the cost of the part's size.
- **The other two refused `asif` forms.** These are a call of another component's overloaded function, and a functional method whose `self` is not first. The alternative is to add them as bullets.

## Points for the coordinator

- **The part's size.** These fixes grew `revival-changes.md` from 22,974 to 23,447 characters, which is further over its budget of 8,000 to 12,000. Five of the changes add text to the orientation's installed sections outside the orientation process. The next orientation update should review them.
- **The compiled path may share the `FloatLiteral` trap.** `equalityRule.java` has a class `FFloatLiteral` and returns `false` when the two classes differ. So a compiled float numeral against a computed `RR64` may also compare `false`. Nothing measures this. If it holds, "on both paths" needs a check.
- **Provenance wording.** The `sources.md` line says "settled by the record-landing workflow's writer task", because no coordinator ruled on these flags.
---
session 2ad7e3a6-b63d-4651-abaf-8ccf3e515e2c turns 40 cache writes 44893 reads 4205750 output 19052 labels {'ephemeral_1h_input_tokens': 44829, 'ephemeral_5m_input_tokens': 0}
