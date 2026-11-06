I updated the `fortress-repo` skill for climb batch 26's landing in two commits. The lint found nothing on any changed file, and nothing was pushed. No test or build was run: the work was text only, and I checked each claim against the code and the ledger.

## Commits

- `d5cd3bc2c`: installs the orientation update into `revival-changes.md`, with its lines in `sources.md`.
- `a48c389b7`: fixes `interpreter.md` and `compiler.md`, with their lines in `sources.md`.

## The orientation install

The judge said "install" for five sections and "no change" for the opening and "Dispatch and overloading". No section was held. I copied `orientation.md` in whole, so the file grew from 19,839 to 20,151 characters. The judge accepted going over the size budget again.

- **"Traits and objects"**:
  - The old text said walk refuses the self-typed pair when a program's own component declares both (row 804). Row 804 is now fixed.
  - The new text says walk loads the pair in the library and in a program's own component. Walk still refuses it in two cases:
    - a trait that is self-typed only through another trait;
    - a method with static parameters of its own.
  - Two smaller wording fixes in the same section.
- **"Static parameters"**: the code generator "accepts" a declaration's own `where` clause, in place of "compiles".
- **"Numbers"**: the numerals sentence now reads "differ only at the positions of the call's numerals".
- **"Reductions"**: "The team's tests declare `simpleJoin` so".
- **"Implementation limits"**: the bold rule is split. That walk will run the checker after the switch-over is now stated as a plan.

## Sentences changed

**`interpreter.md`, "What walk checks"** (grounded in F-318):
- **The pairs that keep the team's old check.** Walk now checks a new kind of pair by the overloading rules, so I removed it from that list. The item now reads: "…nor a generic function beside a functional method of a generic trait or object that has no static parameters of its own;"
- **The row 804 bullet.** It said walk refuses the pair. I replaced it with two new departures:
  - "It does not refuse a type that extends a self-typed trait `T[\A\]` and is not an `A`… A call that both `T`'s operator and another declaration fit then runs one of them (ledger row 893)."
  - "It loads a generic function inside the declared domain of a self-typed trait's functional method, where the Return Type Rule holds. The checker refuses it by a rule that the specification does not state, and no decision says which path is right (ledger row 894)."

**`interpreter.md`, "Natives"** (grounded in F-299, F-307, rows 846 and 877, and `StaticNativeApp.java`):
- **The carrier list.** It said `String` is always carried. Now: "`FlatString` and `JavaString` in `String`, and `String` too, except as a parameter other than `self`".
- **The carriers of `self`.** It excluded `FlatString`. Now: "except `JavaString` and `()`… but `FlatString` only where it is the library's own".
- **Programs that name a type `FlatString`.** The old text said a method of the library's `FlatString` cannot bind a helper. That is false: eleven of its methods now do. The new text says walk tells the library's `FlatString` by the component that declares it, so a program's own type of that name carries no `self`. It also says a parameter declared at such a type is still carried by its name, so the native receives the type's name (row 877).
- **The refusal message.** "is not in the first list" became "is not carried by the first list". This covers a parameter declared `String`.
- **The `CatString` paragraph.** It now names the two cases that still get the wrong text:
  - a glue class bound over `String`;
  - a helper bound as `self` in a method of `String`.

  The advice now gives the library's form: a native over `FlatString` beside an overload over `String` (`Library/FortressLibrary.fss:4640-4644`).

**`compiler.md`** (grounded in F-320, row 304, F-321 and row 895):
- **Local functions.** I removed "a local function declaration" from the list of constructs that the code generator cannot compile. A short list after it gives the three forms it still refuses (row 304).
- **Helper classes.** I added one sentence after the wrapper sentence. In the count and distance stages, a type maps only if the interpreter's library declares it. So any binding of a `systemOps` helper stops its component (row 895).

**`revival-changes.md:43`** was fixed by the orientation install.

**The changed decision (P-159, row 672):** no sentence in the skill rests on its old words, so nothing changed.

`interpreter.md` grew from 18,810 to 19,227 characters, and `compiler.md` from 28,507 to 28,986.

## Choices I made

- **The old `sources.md` lines.** The judge asked me to replace the batch 21 line that cited row 804's refusal. I kept it and marked it "replaced on 2026-11-06", as the file has done before, so the dated history stays. The other way is to delete it.
- **Row 877.** I added that trap because the sentence it replaces had to be rewritten anyway. The other way is to leave row 877 out of the skill.
- **Row 894.** I said that no decision says which path is right, but I added no rule about tests. Row 713 does have such a rule: "Assert neither path's answer in a test". Adding the same rule for row 894 would be a new rule, so I left it out.
- **"Trait or object".** F-318 says "generic trait", but the code (`traitMethod`) takes a functional method of a generic trait or object. I wrote "trait or object" to match the code.

## For the coordinator

- No sentence in another skill was made false.
- The task data said the batch made ten skill sentences false, but the review lists nine plus one that was incomplete. All ten are handled.
- The judge wanted gather.1's fix of `interpreter.md:53` to land with the install, or before it. It lands in the next commit, so `main` has no gap between the two.
- `PLAN.md:651`, gather.1, can now be closed.
- The working tree has changes I did not make, and I left them alone:
  - `explorations/coordinator/tools/orientation/regression/key.md`
  - the untracked `climb-batch-26/orientation/` and `climb-batch-26/skills/` folders
---
session cb343930-4438-456d-81cf-19ea05538b45 turns 53 cache writes 92610 reads 3815113 output 20810 labels {'ephemeral_1h_input_tokens': 92528, 'ephemeral_5m_input_tokens': 0}
