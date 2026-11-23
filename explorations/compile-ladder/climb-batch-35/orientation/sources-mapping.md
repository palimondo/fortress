# Sources mapping: climb batch 35, update mode

Base: `.claude/skills/fortress-repo/references/revival-changes.md` at `main` `9322330fa8`, 34,077 bytes. Each change follows `admission.md` in this folder.

| Section, rule | Change | Sources |
|---|---|---|
| "Dispatch and overloading", "`override` widens" | The "Two departures" sentence (rows 650 and 653) is deleted. The refusal of an `override` that overrides nothing is now stated for walk and the checker together. | F-400; rows 650 and 653, closed by `d56eb8a882` and `8dc97a08df`; `compiler_tests/XXXOverrideNothingCompiled`, `OverrideModifierCodeGeneration`, `OverrideBridgesCompiled`. Admission, change 1. |
| "Numbers", the coercion paragraph after "A numeral converts where it stands (P-173)" | `Byte(v.asZZ32)` becomes `Byte(v)`. The `ZZ` reading of the numbers is replaced by the rule: no method invocation in the body; each number converts where it stands; a `ZZ` only where nothing fixes a type. One sentence gives the tree's departure and the library's `v.asZZ32` (`Library/FortressLibrary.fss:847`). | P-174, P-173, P-40 as rewritten on 2026-11-23 (`be43ddc647`, `2af3ec103d`); F-342 for the departure, with no ledger row. Admission, change 3. |
| "Numbers", "`Number` declares nothing (P-165)" | The conversion into `RR64` is now the getter `x.asRR64`. One sentence gives the tree's departure: `asFloat(self): RR64` on each type, no `asRR64` (`Library/FortressLibrary.fsi:321`, `:415`, `:522`, `:589`, `:661`, `:727`). "`asFloat` among them" becomes "this conversion among them". | P-165 as rewritten on 2026-11-23 (`be43ddc647`); F-324 for the departure, with no ledger row. Admission, change 2. |
| "Numbers", "`/` on two integers answers a `QQ`" | The `ZZ64` sentence names the conversion into `RR64` and drops "the one library's `asFloat`". The example `asFloat(s) / asFloat(n)` stays, under the departure stated in "`Number` declares nothing". | P-165, F-324. Admission, change 2. |

## Fix round (preserve.md, cold-read.md, quiz-grade-1.md)

| Section, rule | Change | Sources |
|---|---|---|
| Opening, the classes of sentences | One sentence: a departure that cites a FACTS entry in place of a row is treated as one that cites a row. | cold-read item 3. |
| "`override` widens" | "So a Java-style `override` in the library stops every program" gains "under walk". | preserve, minor note. |
| "Numbers", the coercion paragraph | The example declaration ends at the `where` clause; `Byte(v)` follows the rule. Added: the four static arguments are naturals of any size, without the `NN32` bound of a size; a number is refused statically where it does not fit. "The body runs at compile time" becomes "The body computes from them and invokes no method". The departure names the code generator too and cites F-341, F-342 and F-347; the checker's refusal is no longer stated as tested. The form that runs under walk today, `Byte(v.asZZ32)`, is given. The P-176 sentence says when each path computes the value. | preserve 1, 2, 3, 7 (P-174, P-40, P-176, F-341, F-342, F-347); cold-read item 1. |
| "`Number` declares nothing (P-165)" | "Each of the eight number types"; "The one library departs". "write `asFloat(x) = y`" gains "for an `RR64` `y`". | preserve 4, 5 (P-165, F-324); cold-read item 16. |
| "`/` on two integers answers a `QQ`" | "with the one library's `asFloat`" restored. | preserve 5; `sources.md:1557`. |
| Self-typed traits; "Walk has no static types"; "The number types are flat siblings" | Cut, to keep the size: the list of shapes in which a compiled `self` return runs; the justification of the library's array `+` and `-`; "Walk will run the checker only after the switch-over" (P-12 moves to the bold rule); "route A". | cold-read section 3, items 1, 2, 3, 6. |
