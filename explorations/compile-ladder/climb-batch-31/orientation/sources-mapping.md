<!-- The orientation update's mapping for climb batch 31, run 1: the one changed passage of "Traits and objects" and its sources. -->

# Sources mapping: climb batch 31, run 1 (update)

One passage changed. No heading was added or removed.

## "Traits and objects", the rule "In a self-typed trait the checker types `self` as the trait met with the implementing type"

Replaced: the rule's last sentence, "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695)." (`.claude/skills/fortress-repo/references/revival-changes.md:41`).

New text: one sentence, a list of three shapes, and a workaround with its scope.

| New text | Source |
|---|---|
| A compiled body of `T` that returns `self` at `X` runs, also where `X` is an object type. | F-377; F-225 (rewritten sentence); row 695 fixed at `6df780a7d0`; `ProjectFortress/compiler_tests/SelfTypeReturnSelfRun.fss` (`object Pt extends Shape[\Pt\]`). |
| A function expression or a local function that returns `self` at `X` fails verification (row 1050). | F-377; row 1050; `compiler_tests/XXXComprisesValueFromClosureRun`. |
| A conditional with `self` in one arm and another value fails verification (row 1051); `StandardTotalOrder`'s `MIN` and `MAX` have this shape. | F-377; row 1051; `compiler_tests/XXXComprisesValueAtConditionalArmRun`; the failure of gather.1's program (`climb-batch-31/RECORD.md`, "The tests on the merged tree"); `Library/FortressLibrary.fss:291-292`, checked. Written as a shape, not a measured failure of the library (admission, points for the writer). |
| The integer types, `QQ` and `RR64` declare their own `MIN` and `MAX`. | P-47, as the admission's third point for the writer gives it; added in the fix round from the preservation check's note. |
| A default body that calls a method on a value of type `X` gives a `ClassCircularityError` where the object lists `T` first (row 1052). | F-225 (rewritten sentence, "a value of the self-type parameter"); ledger row 1052. The fix round replaced "another argument" by "a value", from the preservation check, failure 1. |
| For the first two shapes, bind `self` to a variable of type `X` first, as `s: X = self`; this has run only in a trait with a `comprises` clause, as `r: R = self` in `trait Q comprises { R }`. | F-377; rung K's probe W (`rung-comprises-cast/REPORT.md:97`). The fix round named the type `X` and moved `R` into its example, from the cold read, point 2.1. |
| For the third shape, declare the method in the object. | Ledger row 1052, its notes ("Workaround: declare the method in the object"). No run of it is cited. Added in the fix round from the preservation check, failure 2, which corrects the first round's claim that the record gives none. |

## "Dispatch and overloading", the rule on exclusion over the whole tuple (P-152)

Changed: "Both paths refuse a pair where the equalities leave a static parameter free" became "Both paths refuse a pair whose exclusion needs a static parameter that the equalities leave free". Wording only, from the cold read, point 2.12: the sentence before it says that one excluding position suffices.
