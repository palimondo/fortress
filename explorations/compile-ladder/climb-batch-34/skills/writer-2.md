I fixed all 15 of the cold read's flags in one commit, `86acf04074`, and did not push. The lint found nothing in the three changed files. I checked each fix against the code, the facts entries or the ledger rows, but I built and ran nothing.

## What changed, and why

**`compiler.md`, the type assumption passage (`e asif T`)**
- **Which calls compile.** The text said "an overloaded function of its component". A worker could not tell if a name that the component overloads beside an imported one counts. It now says "an overloaded function or operator that the call's own component declares", as F-325 does.
- **The receiver.** The text did not say whether a dotted call's receiver counts as an argument. A worker could not predict `(r asif T).m(a asif U)`. It now says the receiver is not an argument. Such a call compiles where every argument is an assumption or `T` has one method `m`.
- **Undefined terms.** The text used "the resolved one", "at or below" and "dispatch would hold a functional method" without defining them. It now defines "the chosen declaration" as the one the checker chooses at the assumed types, and uses "more specific than" in place of "at or below". The functional-method refusal is now stated by its form, with the example from the test: `pick(n, b asif Named)` beside an object's `pick(self, y: Named)`.
- **The dotted refusals were wrong.** The text listed "a dotted call with an assumption at an argument" under the partial calls only. The code refuses `r.m(a asif U)` whenever `r` is not an assumption and its trait overloads `m`, even if every argument is assumed. The two dotted forms are now written out as code with their real conditions.
- **Two generic messages overlapped.** A worker writing an `XXX` test could not tell which message to pin. Now they are separate:
  - The "some arguments but not all … generic declaration" message is for a more specific declaration that is generic.
  - The "overloaded generic function" message is for a chosen declaration that is itself generic.
- **Layout.** One message now opens a plain list of its four forms, and "It also refuses these forms" opens the rest. This was a low-confidence flag; I took it because its fix was clear.

**`compiler.md`, "The checker's gaps"**
- **"A pair of getters" was unclear.** It now reads: where a type redeclares an inherited getter, the checker applies the Return Type Rule, with each getter's receiver read as the type that declares it.
- **Object expressions.** The text stated the gap without an action. It now says that `fortress typecheck` accepts a pair there that breaks the rule, so check such a pair yourself.
- **The self-typed refusal.** A worker who met this refusal could not recognise it from a bare pointer. The sentence now states the refusal, then points to `revival-changes.md` and row 1094.
- **The type-variable bound.** `Gen` and `n` were not introduced, and "bound `F` by the trait" read two ways. It now says that the trait `Gen` declares `n()`, and to write `F extends Gen` in place of `F extends H`.

**`revival-changes.md`, "Traits and objects", the paragraph on `self`**
- **Exception or departure.** The paragraph counted row 1094 both as an exception to the rule and as a departure from it, so a worker could not tell what the rule answers. It now names one exception, the exclusion test. Row 1094 is a departure, and the text says that the rule accepts the narrower return type. That is how F-394 states it.
- **"That type" was ambiguous.** It now says that the intersection is the object's own type, so the two declarations have one domain, and the checker accepts them only with the same return type.
- **What to write.** It now adds "with the object's type for `X`".
- **The getter route.** It now says that the method is then called as `x.m`, not `x.m()`.

Sizes: `compiler.md` grew from 44,203 to 45,311 bytes and `revival-changes.md` from 33,955 to 34,093 bytes. The flags asked for definitions and missing cases, so the text grew. The standing rule says a rewrite must not be longer than the text it replaces, so these edits break it.

## Decisions not taken
- **The mixed case.** I did not say what happens to a name that the component overloads beside imported declarations. The code chooses by the overload set that the component itself declares, but nothing has measured that case. The alternatives are to measure it, or to keep F-325's wording as it is now.
- **Two bounds.** `F extends {H, Gen}` would keep `F` below `H`, but nothing has measured it. The only bound on record is a trait bound, so the text gives `F extends Gen`. The alternative is to measure the two-bound form and name it if it passes.

## For the coordinator
- **Orientation text edited outside its workflow.** The `revival-changes.md` paragraph was judged and quizzed as installed, and I changed four of its sentences. The next orientation update, and quiz cases 21 and 38, should read the new text.
- **Fact repeated.** Row 1094's refusal is now stated in both `compiler.md` and `revival-changes.md`. The cold read asked for that, but it repeats one fact in two parts.
---
session ed4ad157-a88c-4076-9417-f6658a508f1c turns 15 cache writes 27008 reads 1352386 output 11626 labels {'ephemeral_1h_input_tokens': 26982, 'ephemeral_5m_input_tokens': 0}
