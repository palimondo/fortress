I fixed 26 of the cold reader's 30 flags in one commit, `e64da5d944`, and left 4. Lint passed with no hits on every changed file. Nothing is pushed.

## What a worker would have done wrong, and what the text says now

**`SKILL.md`**
- **"The caches":** the start of a cache entry gave the source's path, which the next paragraph already says. It now gives only `(Component @"`.
- **"Parallelism and mutable state":**
  - A worker on walk does not load `compiler.md`, so it would not learn that an `exit` out of an `atomic` block loses the block's writes. This holds on both paths, so the sentence and its workaround (set a flag, exit after the block) moved here.
  - The same reader could think that something refuses a `var` field in a value object. The text now says that nothing refuses it, so give it none.
- **"Fortress as a language":** the Return Type Rule is now named where the rule is stated. A worker on the compiled path met the name in `compiler.md` with no definition.

**`compiler.md`**
- **"The runtime":** "also an object's `var` field" could be read as a second cell beside the variable's. It now says that the field is kept "in a cell that the object holds".
- **"Traps of the compiled path":**
  - **The `finally` clause:** "or that `ForbiddenException`" had no verb. The text now lists the three things that skip the clause: an `exit`, an exception that no `catch` clause takes, and the `ForbiddenException` that the `try` throws.
  - **"Atomic expression":** the term was used before any example. It is now defined where it first appears: `atomic e`, as `atomic 1`.
  - **A `label` block that ends in a numeral:** the old text did not show `exit ... with`. It also did not say to end the block with the typed variable, so a worker could bind the numeral and still fail. It now says both. I checked this against `XXXLabelNumeralValueCompiled.fss`.
  - **An atomic expression with a numeral value:** "a place of declared type" is now "a place that fixes a type", the term of `revival-changes.md`. The text now also says that the checker refuses it.
  - **`LabelExit` and `LabelException`:** neither name was explained. `LabelExit` is now named as the Java exception, which no `catch` clause takes. `LabelException` is named as the library's, which walk's `catch` takes.
  - **The self-not-first overloads:** the old text did not say which code tests what. It now says that the compiled dispatch method tests the receiver's type where it should test the other argument's. It then gives each of the two results with its row.
  - **The `var` field assignment:** the example's `T` read as a type parameter. The example now declares `trait T`.
- **"The checker's gaps":**
  - **The tuple-domain pair:** "a pair" after "a tuple" could mean the tuple. It is restated as "a pair of declarations".
  - **The tie:** "the head of its sort" named no sort. It now says that the checker sorts the candidates and keeps the first. It also says what to do: if a compiled test passes alone and fails in the suite, look for such a tie first.
  - **The method reached along two paths:** the chapter that does not settle it is now named by its file, `Specification/basic/traits.tex`. The bullet now ends "Assert neither path's answer in a test", as the part says for row 786.

**`gate.md`, "The atomic runs":** the count of programs is cut, because the loop's list gives them and the count must change each time the list does.

**`interpreter.md`, "What walk checks":**
- "Plain declaration" and "object type" were unclear. The first item now says "without static parameters", and that `NN32` is an object type in walk's library. I checked this in `FortressBuiltin.fsi:132`.
- The second item now says that `ZZ64` is the trait that comprises the one object `Long`.
- The third item now says why the arrow pair breaks the Return Type Rule. A function of type `Any -> Circle` is also a `Circle -> Circle`, and at that instance the generic one returns `Any -> Circle`. This is from row 1049.

**`revival-changes.md`, "Traits and objects":**
- The rule "declare it again without `override`" now warns that the checker refuses this where an object reaches a generic self-typed trait's method along two paths (row 1037).
- "Also where `X` is an object type" and "still" are cut. They told what the fix changed, not what to do.
- **`MIN` and `MAX`:** a worker could not tell when they fail, or what its own type should do. The text now says that they have this shape from the switch-over, because the compiler's prelude declares neither (`CompilerAlgebra.fss:17-23`). It says that a compiled type that extends `StandardTotalOrder` declares its own, as the integer types, `QQ` and `RR64` do.
- "Default body" is now defined: a body that `T` gives one of its methods.
- The sentence on where the `s: X = self` workaround has run is cut. Its example was not a self-typed trait, and its only action was a test run, which a worker does anyway.

`revival-changes.md` is now 32,123 bytes.

## Flags left

- **`compiler.md`, the exit after its `label` block has completed: "assert neither path's answer".** A plain test, `ExitAfterLabelCompletedCompiled`, already asserts the compiled answer, so this would contradict a test that the gate runs. The alternatives:
  - add "assert neither" and change that test;
  - add "assert only the compiled answer".
- **`compiler.md`, the tuple-domain pair: "a compiled test of it is an `XXX` test".** `tests-writing.md` already gives that rule, and no workaround is on record.
- **`interpreter.md`, whether a `var` field keeps the generic value.** Row 1036 measures only an immutable field. The record does not settle the `var` case.
- **`revival-changes.md`, "Dispatch and overloading", the P-152 rewording.** The judge checked the installed wording against P-152. The proposed wording could change the rule's meaning.

## Decisions not taken

- **The tie between generic candidates:** I added only the diagnostic ("look for such a tie first"). I did not add the proposed action, "make one candidate more specific". No record shows that it works.
- **The two-path refusal:** I added "assert neither path's answer". It follows the part's practice for undecided cases. The record says only that the case is not decided.
- **The workaround sentence:** I cut the sentence on where `s: X = self` has run. The judgement said it could go once the regression key's run at the self-type parameter is on record. That run is in `key.md`, which is modified but not committed in the working tree. The alternative was to keep the sentence until the key is committed.

## For the coordinator

- The regression key (`key.md`) is still uncommitted. The cut workaround sentence rests on its run.
- The `MIN` and `MAX` instruction rests on P-47 and on the judge's check of the compiler's prelude. No run of a compiled type that declares its own `MIN` and `MAX` is cited.
---
session 9a19f1d9-24da-44df-a8b4-3d5ad040bbf8 turns 27 cache writes 31925 reads 2096261 output 14929 labels {'ephemeral_1h_input_tokens': 31899, 'ephemeral_5m_input_tokens': 0}
