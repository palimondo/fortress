<!-- The clarity pass's pilot, 2026-10-22: ten POSITIONS entries rewritten from the audit's proposals so that a reader without the conversation can tell what the curator decided, with each entry's change of meaning, sources and questions. -->

# The clarity pass: ten entries

Each entry starts from the audit's proposed text (`entries.md`). The sources are the audit's evidence files in `explorations/coordinator/positions-audit/full/evidence/`: the scout's report `P-N.md`, and the chunk's `judgement-cN.md`, `corrections-cN.md` and `takeaway-cN.md`, each cited by its section for the entry. A time is the curator's message, in UTC. "The takeaway's fix" names a fix that the takeaway check drafted and did not apply.

The ten entries hold 5,919 characters in the audit's text and 8,349 here. Four stay well over 600: P-45 (1,313), P-40 (1,369), P-146 (1,007) and P-153 (927). Each holds several conditions that limit the decision, and each condition stays.

## P-45

> - P-45 **Overloaded declarations may differ in their static parameters.** The specification drops its sentence that forbids this. It states instead the overloading model of the type group's 2011 paper (`Papers/Types/`), which the compiled checker already used, and keeps the old sentence as superseded text. The checker keeps the paper's three rules: No Duplicates, Meet and Return Type. It checks the Return Type Rule over every instance of a generic declaration. If one generic declaration is more specific than another, the two must agree on their static parameters position by position, as in Java's rule for overriding (gap-ledger row 398). Walk chooses among overloads by the parameter types that each declaration declares, not by the order in which they are written. At load, walk checks every pair of generic declarations on those declared types by the checker's rules, also where no pair of their parameter types excludes. Walk and the checker must accept the same pairs (gap-ledger row 159). The library repairs the overload sets that the checker refused with exclusion declarations of its own, and no line of the two microGPT programs changes. Still to build: the pairs that walk and the checker still judge differently (F-26; gap-ledger rows 539, 759, 779, 780 and 786 to 788; PLAN, phase 3, item 19).

Meaning: unchanged.
- "Walk and the checker must accept the same pairs" states as a requirement what the audit's text gave as a purpose clause ("so that ..."). It is his condition of 2026-10-16T19:47:32.836Z: "Does this mean bringing it in line with the compiler's checker behavior? Then yes." The "Still to build" line says that the two do not yet agree.

Sources:
- The title to "no line ... changes", except walk's load check: 2026-09-26T12:07:33.636Z "Yes, agreed." and 12:08:32.187Z "Agreed, the judgement's recommendation.", to the coordinator's 12:01:53.076Z (`judgement-c3.md:106`). The paper and its three rules: `explorations/reviews/overloading-judgement.md`, section 2, "The paper". "Already used": the same judgement, section 1, and `Specification/basic/overloading.tex:111-120`.
- Walk's load check and the requirement: 2026-10-16T19:47:32.836Z (`judgement-c3.md:107`). "Also where no pair of their parameter types excludes" is the takeaway's reading of "with no parameter pair required to exclude" (`takeaway-c3.md`, "P-45"; F-252).
- "No line of the two microGPT programs changes": the ask's "No model line changes" (`P-45.md`, section 1), which the judgement says of "either model file" (`overloading-judgement.md`, section 1).
- "Still to build": the audit's line (`corrections-c3.md`, "P-45", part 5).

Question for the curator:
1. The ask that you took on 09-26 let the library repair its overload sets "with its own techniques": marker traits, `excludes` clauses, and helpers chosen by a type test. The entry says only "exclusion declarations". Should it read "with its own devices, such as `excludes` clauses and helpers chosen by a type test"? I kept the audit's narrower wording. (The takeaway's fix, `takeaway-c3.md:94`.)

## P-50

> - P-50 **The body of a `label` expression, and each value that an `exit` gives it, take the expected type of the whole `label`.** A `label` is a named block that code inside it can leave early with `exit`, giving a value with `with`. The specification types a `label` as the union of its body's last expression and the values that its `exit` expressions give. So the compiled checker passes the expected type of the whole `label` into the body and into each of those values, as it does into each clause of a `typecase`. The specification's inference chapter lists both as contexts that carry an expected type. P-51 decides the same question for a call written as another call's argument. Built (F-87).

Meaning: unchanged.
- "P-51 is the other half of item 48" becomes the relation that it stands for: both entries decide where a call gets an expected type.
- "Built (F-87)." is new. It states the tree: `Misc.scala:704-739`, built by `054c4bcfd` (`P-50.md`, section 2).

Sources:
- The rule: 2026-10-09T06:59:48.891Z "(a) has a yes", to the coordinator's 06:56:20.441Z (`judgement-c3.md:210`).
- The gloss of `label`: the coordinator's explanation that he took, "a named block that code inside it can leave early, with a value" (`P-50.md`, section 1).
- The inference chapter: `Specification/basic/inference.tex:143-148` (`P-50.md`, section 2).

Questions for the curator: none.

## P-51

> - P-51 **The checker retries a call written as another call's argument against each declaration's parameter type.** Here the outer call is the call that the compiled checker checks, and the inner call is one of its arguments. If none of the checker's attempts accepts the outer call (P-49 gives their order), the checker checks the inner call again, once for each declaration of the outer call, with that declaration's parameter type as the inner call's expected type. The retry covers every inner call with inferred static arguments, not only one whose type parameter occurs in its result type alone. Why: the curator wants one type inference rule in every context, which covers cases that the team did not build. The measurement behind the decision is in `explorations/reviews/argument-context-probe.md`. Built; it repairs gap-ledger row 455.

Meaning: unchanged.
- "When the checker's attempts at a call keep none" becomes "If none of the checker's attempts accepts the outer call". The code runs the retry when no attempt is kept (`Functionals.scala:740`; `P-51.md`, section 2). The probe says the same: "Only where no attempt of the outer call is kept today" (`argument-context-probe.md`, "The answers", point 7).

Sources:
- The retry and the wide trigger: 2026-10-09T22:10:09.585Z "Q48(b) wide, go ahead", to the coordinator's 15:13:34.608Z, whose options are in its 11:56:38.064Z list (`judgement-c4.md`, "P-51").
- The reason: his reading at 2026-10-09T06:55:25.847Z, "unifying the time [type] inference rules about like everywhere and we are covering gap about cases that they didn't implement yet" (`P-51.md`, "His quotes").
- The probe pointer and "Built": the audit's text (`corrections-c4.md`, "P-51"). Row 455 is FIXED (`P-51.md`, section 5).

Questions for the curator: none.

## P-12

> - P-12 **The compiled type checker is made to check the programs that walk runs, after the switch-over.** The curator wants the checker usable on walk's programs. Today `fortress typecheck` checks a program only against the compiler's prelude, the compiled path's own library, so it is no check of walk's programs (F-9). The switch-over moves the compiled path onto walk's library. After it, the checker runs on walk's programs, and walk also uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59). Still to build: both steps.

Meaning: unchanged, but one reading closes.
- The audit's "It comes once walk also takes the static coercions" can be read as a gate: walk's coercion change first, the checker after. A cold reader read it so (`takeaway-c1.md:93`). The audit's writer read the two as one step (`corrections-c1.md`, "P-12", sentence 5). The new text puts both after the switch-over and orders neither. Question 1 asks the order.

Sources:
- The title: 2026-09-29T14:07:20.452Z "item seven as recommended. So one now and two after the switch.", to option 2 of the decisions review's item 7 (`judgement-c1.md`, "P-12").
- The wish: 2026-09-15T10:42:06.544Z, running the checker optionally in walk (`P-12.md`, "His quotes").
- "Today ...": F-9; `Shell.java:403-424` (`P-12.md`, section 2).
- The coercion step: the coordinator's 2026-09-29T14:08:16.691Z, and P-59 (`P-12.md`, section 1).
- "Still to build": the scout found no PLAN item that carries the checker on walk's programs as its own step (`P-12.md`, section 5), so the line names no item.

Questions for the curator:
1. Your words of 14:07:20 on 09-29 order the steps: once the checker runs in walk, walk gains the types "and can switch". Should the entry say that order: after the switch-over the checker runs on walk's programs, and then walk takes the coercions that the checker inserts? (The takeaway's fix, `takeaway-c1.md:99`.)
2. The same message says that walk is not touched for this until the library is switched. Should the entry say so?

## P-29

> - P-29 **Walk's speed is irrelevant to every judgement of Fortress's performance.** Walk is far slower than Python's interpreter (`explorations/microgpt-port.md`, "Step-0 results"). Fortress's performance is judged on the compiled path, once microGPT runs there. So no performance decision rests on walk's timings. Until microGPT runs compiled, no edit is made to C4, the flat microGPT program, for speed. The gate never runs the two microGPT programs, C4 and the APL-style program, because they run too long to be tests. Why: walk is the unoptimised path, as a debug build is in Swift, where performance is not judged either.

Meaning: unchanged.
- The "Why" is new to the entry, and it is his: "we cannot judge performance on unoptimized builds in Swift. The same way we cannot judge anything performance related in Fortress while we do not have a compiler" (2026-09-19T16:43:19.420Z; `takeaway-c2.md:72` and its "Tighten"). The audit's text gave walk's slowness as the reason. That was his support, not his ground.

Sources:
- The title, the judgement on the compiled path, and no decision on walk's timings: 2026-09-19T16:43:19.420Z (`judgement-c2.md`, "P-29"; `corrections-c2.md`, "P-29", sentence 3).
- No edit of C4 for speed: the coordinator withdrew its default at 16:43:26.371Z (`judgement-c2.md`, "P-29").
- The two programs: the gate compiles the flat and the APL-style microGPT programs (`explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.sh:29-35`). "Too long to be tests": 2026-09-19T16:39:48.865Z.

Questions for the curator: none.

## P-40

> - P-40 **Sizes are checked, and a size that inference leaves unknown is an error only where it is used.** A size is a `nat` or `int` static parameter, such as the length of an array in its type. The compiled checker checks sizes, and refuses a size beyond `NN32` or `ZZ32` (F-140). Where the array design creates a JVM array, it refuses a length over 2^31-1. A size that inference leaves unknown is an error only when it reaches a type, a name or a value. If the declaration that a call would choose needs a size that the call cannot fix, the checker refuses the call, also inside an overload set, instead of passing over that declaration. In the exclusion rule, every static argument except an operator tells two instantiations apart; boolean arguments join once the checker has boolean parameters. A size used as a value converts to `ZZ32`, as a numeral does (gap-ledger row 485). The 17 vector and matrix operators of the `FortressLibrary` api lose their unused sizes by the change in `perf-probes/array-sites/e3-rebased.patch`. That change finishes the team's own fix of 2008, which removed them from the component only (F-35). Still to build: the refusal of a JVM array length over 2^31-1 (PLAN, phase 5; under walk, gap-ledger row 527); the compiled half of the refusal of a call (gap-ledger row 400); boolean arguments in the exclusion rule (gap-ledger row 406).

Meaning: unchanged.
- "Go by decision E's diff" becomes "lose their unused sizes by the change in ...". His yes took option 1 of the ask, "The api's 17 headers lose their unused sizes" (2026-10-20T05:42:24.706Z; `takeaway-c2.md`, "P-40"). The audit's text did not say what the diff does.
- The rows move from parentheses into one "Still to build" line. Each row's state is the scout's (`P-40.md`, section 2): 527, 400 and 406 NEGATIVE-VERIFIED, 485 FIXED.
- "Instead of dropping the arm" becomes "instead of passing over that declaration", after the ask he took: "refuse the call ... instead of silently dropping that version" (`takeaway-c2.md`, "P-40").

Sources:
- Sizes checked: 2026-09-19T18:32:48.384Z. The bound: 2026-09-27T06:44:55.156Z, to the coordinator's 06:38:29.847Z, which also gives the JVM array check (`judgement-c2.md`, "P-40").
- The unknown size: 2026-09-21T16:57:37.256Z. The refused call: 2026-09-26T12:20:23.332Z. The exclusion rule: 2026-09-26T09:24:48.043Z. A size as a value: 2026-09-28T19:17:29.239Z (`judgement-c2.md`, "P-40").
- The 17 operators: 2026-10-20T05:32:27.765Z and 05:42:24.706Z (`judgement-c2.md`, "P-40").
- "Tells two instantiations apart": the ask's option 1, in which every static argument but an operator counts when the exclusion rule compares two instantiations (`P-40.md`, section 1, item 2; `TypeAnalyzer.scala:539-546`, section 2).

Questions for the curator: none. The takeaway's other clause, "a size declared and used nowhere passes", is not added. It is an example of the rule, and the entry keeps the rule.

## P-74

> - P-74 **Mixed integer widths convert by declared coercions: each wider type declares a `coerce` from each narrower one, as the compiler prelude does.** A conversion that is exact is implicit, and a conversion that can lose precision is written out. So `ZZ32` values and integer numerals coerce into `RR64` implicitly, and a `ZZ64` value into `RR64` is written out (P-66). A call of a generic function with arguments of mixed widths infers the narrowest type into which its arguments coerce. A range is over `ZZ32` only (P-77). The specification's `widens` declaration is deferred. Built, except `NN32` into `RR64` (P-75).

Meaning: unchanged. The state changes.
- "Built." becomes "Built, except `NN32` into `RR64` (P-75)". The general sentence covers `NN32` into `RR64`, which is exact, and that coercion is not built (gap-ledger row 575, CONTESTED; `takeaway-c6.md`, "P-74", its fix). The decision is the same; the state is now true.

Sources:
- The rule: 2026-09-26T12:01:24.267Z "Option 1, agreed.", to the coordinator's 11:43:42.784Z (`judgement-c6.md`, "P-74").
- The general sentence: 2026-09-29T14:10:36.799Z, "if it fits, then there should be direct conversion" (`judgement-c6.md`, "P-74").
- "Its arguments": F-55, "A mixed-width call takes the narrowest type its arguments convert into".
- The range: 2026-09-27T19:23:07.996Z, P-77 (`corrections-c6.md`, "P-74", sentence 3).

Questions for the curator: none.

## P-146

> - P-146 **In a self-typed trait, the compiled checker types `self` in the method bodies as the implementing type.** A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`. In its method bodies, `self` has the type `C[\X\] & X`. The method signatures keep the plain trait type, because the proofs of the POPL 2019 paper on multiple dispatch (Park, Hong, Steele and Ryu) assume that no declared type holds a type parameter inside an intersection. The checker refuses a type that extends such a trait at another type, such as `object Bad extends Integral[\ZZ32\]`, by Scala's conformance rule. The library's text gains no self type and no `comprises` clause, and walk is unchanged. The rule accepts every self-typed method body of the library except `Integral`'s `numerator`, which each integer type declares instead. Why: the checker reads the library as the team wrote it, as P-44 does, by one rule that peer languages share. Built (F-225).

Meaning: unchanged.
- "(way 6)" leaves the title. It is the judgement's label, which no ask to him used (`P-146.md`, section 1). Review-queue item 1 and the `fortress-repo` skill's `references/sources.md:639` quote the title. `record.py` refreshes quoted words only in FACTS and POSITIONS, so the coordinator updates those two.
- "Built (F-225)." states the tree: `1c32ccffd` (`P-146.md`, section 3).

Sources:
- The rule, the examples `Integral` and `Bad`, and "walk is unchanged": 2026-10-13T23:37:34.404Z "1.", to the coordinator's 23:32:24.772Z (`judgement-c5.md`, "P-146").
- The paper's assumption: the coordinator's 23:24:28.785Z (`judgement-c5.md`, "P-146"); `research/extracts/ParkPOPL2019-extract.md:258-264`.
- `numerator`: 2026-10-14T07:10:28.105Z (`judgement-c5.md`, "P-146").
- The reason: his 23:32:10.196Z, "option 1 is more in line with weak signal from repo and has precedent in other languages as well" (`judgement-c5.md`, "P-146").

Question for the curator:
1. As built, the rule also accepts a trait that extends a self-typed trait at its own bounded parameter, as the team's `ContainmentBySubset` and `ContainmentByComparison` do. The coordinator took that widening on 2026-10-14 at 00:08 UTC, and it waits for your review (the audit's drafted review item for chunk c5). Read alone, the entry's refusal sentence refuses those two traits. Should the entry name the widening as the coordinator's call, or leave it to the review item? (The takeaway's fix, `takeaway-c5.md:40`.)

## P-153

> - P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction.** Each integer type's `^` returns its own type at every exponent. At a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. A program that wants a fraction writes a float or rational base, as in `2.0^(-1)`. Why: the team's later code gives an integer power the type of its integer base at a signed exponent (P-26). Overloads choose by type, and no type carries the sign of an exponent or a numeral. So the split is on the base, and the sign is tested at run time, as the library tests every sign-refined subset (P-80). Built in the library and under walk (F-263). Still to build: the compiled path's own powers by the same rule (gap-ledger rows 441 and 523; PLAN, phase 4, the natives).

Meaning: unchanged.
- "(contract E)" leaves the title. It is a label of the ask's options. F-263 still uses it.
- The contract's three cases now sit under "At a negative exponent". In the ask that he took, the case of base 0 sat under "A negative exponent raises ...", and walk checks it only there (`Int.java:288-293`), so `0^2` is 0. F-263 states it in the same order (`takeaway-c7.md`, "P-153", its fix).
- "Built in the library and under walk (F-263)." states the tree: rung I, `5ad4a9957` (`P-153.md`, section 2).

Sources:
- The rule and the reason: 2026-10-20T00:44:34.730Z "Yes.", to option 1 of the coordinator's 00:19:08.321Z (`judgement-c7.md`, "P-153").
- The title: the split that he recalled at 05:56:19.215Z and went on from at 06:01:04.054Z (`corrections-c7.md`, "P-153", sentence 1).
- "Still to build": the audit's text (`corrections-c7.md`, "P-153", sentence 3). Its timing, phase 4, is an agent's default that the audit drafted for the review queue.

Questions for the curator: none.

## P-67

> - P-67 **`round` on an exact half goes to the even integer, on both paths.** Under walk and on the compiled path, `round(2.5)` gives 2: an `RR64` or `RR32` value rounds an exact half to the even integer, as a rational does. This is the specification's rule for rationals, the default rounding of IEEE 754, and the rule of the team's own `round` on rationals. Built.

Meaning: unchanged.
- The second sentence names the types. The question was about the float types (gap-ledger row 329, "`round` on an exact half for the float types", `P-67.md`, section 3), and the rationals already rounded so (`takeaway-c5.md`, "P-67"). The example is the ask's: "`round(2.5)`: is it 2 or 3?" (`P-67.md`, section 1).

Sources:
- 2026-09-21T21:03:23.920Z "Agreed, but I want historical evidence", to the coordinator's 20:57:43.103Z: "Half to even on both paths. The spec's rule, IEEE's default, and the team's own rational body." (`judgement-c5.md`, "P-67").
- "Built": `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:133` all use `Math.rint` (`P-67.md`, section 2).

Questions for the curator: none.
