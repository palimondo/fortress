<!-- The clarity pass's pilot, 2026-10-22: ten POSITIONS entries rewritten from the audit's proposals so that a reader without the conversation can tell what the curator decided, then fixed from the cold read, the fidelity check and his page comments on pointers; with each entry's change of meaning, sources and questions. -->

# The clarity pass: ten entries

Each entry starts from the audit's proposed text (`entries.md`). The second round fixes it from `cold-read.md` and `check.md`, and gives each pointer a few words on what it holds; a pointer that was only provenance moves to the apply file's note line. The sources are the audit's evidence files in `explorations/coordinator/positions-audit/full/evidence/`: the scout's report `P-N.md`, and the chunk's `judgement-cN.md`, `corrections-cN.md` and `takeaway-cN.md`, each cited by its section for the entry. A time is the curator's message, in UTC. Concepts that the entries use and that every worker needs are listed in `../concepts.md`.

The ten entries hold 5,919 characters in the audit's text and 10,657 here. The growth is the pointers' words and the conditions that the check restored. Five stay well over 600: P-45 (1,868), P-40 (1,690), P-153 (1,357), P-146 (1,195) and P-51 (1,026).

## P-45

> - P-45 **Overloaded declarations may differ in their static parameters.** The specification drops its sentence that forbids this, and keeps it as superseded text. It states instead the overloading model of the type group's 2011 paper (`Papers/Types/`), which the compiled checker already used. The checker keeps the paper's three rules: No Duplicates, Meet and Return Type. It checks the Return Type Rule over every instance of a generic declaration that the argument types allow, not over one guessed instance. One rule of the old sentence survives: if one generic declaration is more specific than another, their static parameters must line up position by position, as Java's rule for overriding a generic method requires. Walk chooses among overloads by the parameter types that each declaration declares, not by the order in which they are written. At load, walk judges each pair of two generic declarations by the checker's rules on their declared parameter types. It does not refuse a pair only because none of their parameter types exclude, as when one declaration is more specific than the other. Walk and the checker must accept the same pairs. The library repairs, by declarations of its own, the overload sets that the checker refused, and no line of microGPT's two programs changes. Still to build, where walk or the checker still judges a pair against these rules: walk compares two functional methods of a generic trait or object on the instance that a call makes (F-26); both paths refuse the paper's own valid example (gap-ledger row 539); walk refuses two nested generic functional methods of a plain trait, and fails at a call on them in a generic trait (rows 779 and 780); and walk and the checker disagree on four kinds of pair (rows 759 and 786 to 788). PLAN, phase 3, item 19, the next checker batch's candidates, lists all of these rows but 539.

Meaning: unchanged from the audit's text. The first round's "Still to build" line had narrowed it to the pairs that walk and the checker judge differently. This round restores the audit's meaning, "the pairs that walk or the checker still reads otherwise", and says what each pointer holds (`check.md`, "P-45").
- "The library repairs, by declarations of its own" drops the word "exclusion". It no longer names a device; question 1 asks which devices count.
- "One rule of the old sentence survives" and "that the argument types allow, not over one guessed instance" state what the ask that he took said: "one narrow rule survives from the old sentence", and the return-type check over every case in place of "one guessed solution" (`explorations/reviews/overloading-judgement.md`, section 1).
- "Line up" is the ask's word. As built, the rule compares only two declarations with as many static parameters of their own, and only their return types. Review-queue item 60 holds that scope for his review, so the entry says no more.

Sources:
- The title, the specification, the checker and the surviving rule: 2026-09-26T12:07:33.636Z "Yes, agreed." and 12:08:32.187Z "Agreed, the judgement's recommendation.", to the coordinator's "Answer 9" of 12:01:53.076Z (`judgement-c3.md:106`). The paper and its three rules: `overloading-judgement.md`, section 2, "The paper".
- Walk's load check and the requirement: 2026-10-16T19:47:32.836Z, "Does this mean bringing it in line with the compiler's checker behavior? Then yes." (`judgement-c3.md:107`). What walk did before: gap-ledger row 159, "walk refuses at load two generic declarations of one name unless some parameter pair excludes, even when one is more specific".
- "No line of microGPT's two programs changes": the ask's "No model line changes" (`P-45.md`, section 1).
- "Still to build": the audit's line (`corrections-c3.md`, "P-45", part 5), with the ledger rows' own texts (rows 539, 759, 779, 780, 786 to 788), F-26, review-queue item 77 for row 539 on both paths, and `PLAN.md`, phase 3, item 19.
- Moved to the history: gap-ledger rows 398 and 159, both FIXED; they record where the surviving rule and walk's load check were built.

Question for the curator:
1. The ask that you took on 09-26 let the library repair its overload sets "with its own techniques": marker traits, `excludes` clauses, named helpers chosen by a type test, and one declaration slip corrected. The audit's text said "with its own exclusions". The entry now says "by declarations of its own". Should it name the devices, as in "with its own devices, such as `excludes` clauses and helpers chosen by a type test"? (The takeaway's fix, `takeaway-c3.md:94`.)

## P-50

> - P-50 **The body of a `label` expression, and each value that an `exit` gives it, take the expected type of the whole `label`.** A `label` is a named block that code inside it can leave early with `exit`, giving a value with `with`. The specification types a `label` as the union of its body's last expression and the values that its `exit` expressions give. So when a `label` has an expected type, the compiled checker passes it into the body and into each of those values, as it does into each clause of a `typecase`. The specification's inference chapter lists the body and those values as contexts that carry an expected type. P-51 decides the same question for a call written as another call's argument. Built (F-87 lists the checker's contexts that carry an expected type).

Meaning: unchanged.
- "When a `label` has an expected type" states the inference chapter's own condition (`Specification/basic/inference.tex:143-148`; `check.md`, "P-50").
- "P-51 is the other half of item 48" became the relation that it stands for: both entries decide where a call gets an expected type.

Sources:
- The rule: 2026-10-09T06:59:48.891Z "(a) has a yes", to the coordinator's 06:56:20.441Z (`judgement-c3.md:210`).
- The gloss of `label`: the coordinator's explanation that he took, "a named block that code inside it can leave early, with a value" (`P-50.md`, section 1).
- "Built": `Misc.scala:704-739`, `054c4bcfd`; F-87 (`P-50.md`, section 2).

Questions for the curator: none.

## P-51

> - P-51 **The checker retries a call written as another call's argument against each declaration's parameter type.** Take an outer call `f(g(x))`, whose argument is an inner call `g(x)`. If none of the compiled checker's attempts at the call accepts `f(g(x))` (P-49 gives the order of those attempts), the checker checks `g(x)` again, once for each declaration of `f`, with that declaration's parameter type at `g(x)`'s position as its expected type. The retry covers every inner call with inferred static arguments, not only one whose type parameter occurs in its result type alone. Why: the curator wants the type inference rules unified across contexts, which covers cases that the team did not build. As built, a generic declaration of `f` is first instantiated from the other arguments. The declaration whose retry succeeds is kept, or the most specific of several; otherwise the call goes on as it would without the retry. The measurement behind the decision is in `explorations/reviews/argument-context-probe.md`. Built.

Meaning: unchanged.
- The example `f(g(x))` names the two calls apart (`check.md`, "P-51").
- The three sentences "As built ..." are built state, not his decision. They answer the cold reader's question of what a successful retry leads to (`argument-context-probe.md`, section 1, "The mechanism"; `Functionals.scala:838-849`).
- "The compiled checker's attempts at the call" is a concept for every worker (`../concepts.md`), so the entry names it and points to P-49 without explaining it.

Sources:
- The retry and the wide trigger: 2026-10-09T22:10:09.585Z "Q48(b) wide, go ahead", to the coordinator's 15:13:34.608Z, whose options are in its 11:56:38.064Z list (`judgement-c4.md`, "P-51").
- The trigger: `Functionals.scala:740`, `keptAttempt.isEmpty && retry` (`P-51.md`, section 2).
- The reason: his reading at 2026-10-09T06:55:25.847Z, "this is all about unifying the time [type] inference rules about like everywhere and we are covering gap about cases that they didn't implement yet".
- Moved to the history: gap-ledger row 455, FIXED, the defect that the retry repairs.

Questions for the curator: none.

## P-12

> - P-12 **After the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts.** The curator wants the checker usable on the programs that walk runs. Today `fortress typecheck` checks a program only against the compiler's prelude, so it is no check of walk's programs (F-9 holds this fact). Walk is not changed for this before the switch-over. After it, walk runs the checker on its programs and so gains their static types. Walk then uses the static coercions that the checker inserts, in place of its choice on the run-time value (P-59, walk's choice of coercions until the switch-over). Still to build: both steps, after the switch-over (PLAN, phase 4, names the batch that gives walk the checker's static types).

Meaning: changed from the audit's text, at his own words. The audit's text gave the two steps in no clear order and left out his hold on walk. His message of 2026-09-29T14:07:20.452Z gives both: "It's just a decision that at the moment we do not touch the walk system until we switch the library and then when the like we, we start running the type checker in the walk it will gain types and can switch." So the entry now says that walk is not changed before the switch-over, that walk first runs the checker and gains the types, and that it then uses the inserted coercions (`check.md`, "P-12"). The title says the same. The first round's two questions on the order and the hold are withdrawn: his message answers them.

Sources:
- The title and the order: 2026-09-29T14:07:20.452Z, "item seven as recommended. So one now and two after the switch.", to option 2 of the decisions review's item 7 (`judgement-c1.md`, "P-12").
- The coercion step: the coordinator's 2026-09-29T14:08:16.691Z, and P-59 (`P-12.md`, section 1).
- The wish: 2026-09-15T10:42:06.544Z, "to run the type checker optionally in, in the walk" (`P-12.md`, "His quotes").
- "Today ...": F-9; `Shell.java:403-424` (`P-12.md`, section 2).
- "Still to build": `PLAN.md`, phase 4, Q-walk, "the batch whose step gives walk the checker's static types".

Question for the curator:
1. On 09-15 you asked to run the checker "optionally" in walk. The entry says "usable", as the audit's text does. Is the checker an option of walk, or does walk then refuse a program that the checker refuses? No message settles it (`check.md`, "P-12", uncertain fidelity).

## P-29

> - P-29 **Walk's speed is irrelevant to every judgement of Fortress's performance.** Walk is far slower than Python's interpreter (`explorations/microgpt-port.md`, "Step-0 results", a measurement of 2026-08-23). Fortress's performance is judged on the compiled path, once the compiler runs programs. So no performance decision rests on walk's timings. In particular, until microGPT runs compiled, C4, the flat microGPT program, is not edited for speed. The gate never runs microGPT's two programs, C4 and the APL-style program, because they run too long to be tests. Why: walk is the unoptimised path, as a debug build is in Swift, where performance is not judged either.

Meaning: unchanged from the audit's text. The first round's "once microGPT runs there" put the coordinator's condition on all judgement of performance. His words are "once we get the compiler running, then we will be talking about performance" (2026-09-19T16:43:19.420Z). The condition on microGPT now holds only for the edit of C4, as in the audit's text (`check.md`, "P-29").
- "In particular" marks the edit of C4 as one case of his rule. So the APL-style program falls under the rule too, with no new claim.

Sources:
- The title, the judgement on the compiled path, the reason and the Swift comparison: 2026-09-19T16:43:19.420Z, "we cannot judge performance on unoptimized builds in, in Swift" (`judgement-c2.md`, "P-29"; `takeaway-c2.md:72`).
- No edit of C4 for speed until microGPT runs compiled: the coordinator's 16:43:26.371Z, which withdrew its own default (`judgement-c2.md`, "P-29").
- The two programs: `explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.sh:29-35`. "Too long to be tests": 2026-09-19T16:39:48.865Z.

Questions for the curator: none.

## P-40

> - P-40 **Sizes are checked, and a size that inference leaves unknown is an error only where it is used.** A size is a `nat` or `int` static parameter, such as the length of an array in its type. The compiled checker checks sizes, and refuses a size beyond `NN32` or `ZZ32` (F-140, the bound on both paths). Wherever the array design creates a JVM array, it checks the length there, at run time, and refuses one over 2^31-1. A size that inference leaves unknown is an error only when it reaches a type, a name or a value. So a declaration may declare a size that none of its types uses, and pass. A call that cannot fix a size of the declaration that it would choose is refused, also inside an overload set, instead of passing over that declaration. In the rule that no type extends two different instantiations of one generic trait, two instantiations differ when any static argument but an operator differs, so `Vec[\3\]` and `Vec[\4\]` are two; boolean arguments count too once the checker has boolean parameters. A size used as a number, as in the range `0#n`, converts to `ZZ32` where one is needed, as a numeral does. The 17 vector and matrix operators of the `FortressLibrary` api lose their unused sizes by `explorations/perf-probes/array-sites/e3-rebased.patch`, which finishes the team's own fix of 2008: that fix removed them from the component only. Built, except three parts. The JVM length check waits for the array design (PLAN, phase 5); under walk such an array dies with a raw Java exception (gap-ledger row 527). The checker still passes over a declaration whose unfixed size occurs in its own parameter type (row 400). The checker compares no boolean arguments (row 406).

Meaning: unchanged; the state is corrected.
- The first round's "the compiled half of the refusal of a call" implied a walk half within his decision, and called the compiled half wholly unbuilt. His decision is about the checker alone. The checker's refusal is built, except where the unfixed size occurs in the declaration's own parameter type (gap-ledger row 400; F-69). Walk's half of row 400 is a default in review-queue item 36, not his decision (`check.md`, "P-40").
- "So a declaration may declare a size that none of its types uses, and pass" and the next sentence state the two answers apart: the 09-21 rule, and decision 3, which he affirmed on 09-26 and which makes such a call an error at the call. What "a name" covers beyond that stays open; question 1 asks it.
- "At run time" is the source's "a check where it creates a JVM array" (the coordinator's 2026-09-27T06:38:29.847Z, which he took).

Sources:
- Sizes checked: 2026-09-19T18:32:48.384Z. The bound and the JVM length: 2026-09-27T06:44:55.156Z, to the coordinator's 06:38:29.847Z (`judgement-c2.md`, "P-40").
- The unknown size: 2026-09-21T16:57:37.256Z, to the middle option of the coordinator's 03:09:13.588Z, whose dead sizes "pass because their dead sizes reach nothing".
- The refused call: 2026-09-26T12:20:23.332Z "Agreed, decision 3 stands", to the coordinator's 12:17:56.921Z.
- The exclusion rule: 2026-09-26T09:24:48.043Z "Option 1, sizes count", to the coordinator's 09:20:38.889Z, which states the rule with the same words and asks which arguments make two instantiations different.
- A size as a number: 2026-09-28T19:17:29.239Z, to option 1 of the coordinator's 19:08:35.914Z, whose case is the range `0#n`.
- The 17 operators: 2026-10-20T05:42:24.706Z, to option 1, "The api's 17 headers lose their unused sizes".
- "Built": F-140, F-69 and F-264; the open rows' own texts (527, 400, 406).
- Moved to the history: F-35, the team's fix of 2008 and the 8 dead sizes that remain; gap-ledger row 485, FIXED, a size as a range component.

Question for the curator:
1. "A size ... is an error only when it reaches a type, a name or a value." What does "a name" cover? The checker's rung read it as every static argument of a call, and so refuses a call of a declaration with a dead size, which decision 3 also asks (`compile-ladder/rung-nat-checker/REPORT.md:72-73`; `check.md`, "P-40"). If that reading is yours, the entry can drop "a name".

## P-74

> - P-74 **Mixed integer widths convert by declared coercions: each wider integer type declares a `coerce` from each narrower integer type, as the compiler prelude does.** A conversion that is exact is implicit, and a conversion that can lose precision is written out. So `ZZ32` values and integer numerals coerce into `RR64` implicitly, and a `ZZ64` value into `RR64` is written out (P-66, Java's defaults corrected where they lose precision). A call of a generic function with arguments of mixed widths infers, on both paths, the narrowest type into which its arguments coerce. A range is over `ZZ32` only (P-77, the rule on ranges). The specification's `widens` declaration, which would make a narrow computation stored into a wide variable run wide, is deferred. Built, except the implicit coercion of `NN32` into `RR64`, which is still to build (P-75 holds it, with its conflict with the overloads of `RR64` and `ZZ64`).

Meaning: narrowed back to the ask that he took. The audit's text said "each wider type declares a `coerce` from each narrower one"; the ask said "Each wider integer converts from each narrower one" (2026-09-26T11:43:42.784Z). Beside the `RR64` examples, the broad form read as covering `RR64` (`check.md`, "P-74").
- `widens` is defined in the entry, from the ask: "the spec's "widening" rule, which makes a narrow computation stored into a wide variable run wide. Nothing implements it; it can be added later."
- "On both paths" is the built state: F-73 for the checker, F-137 for walk.

Sources:
- The rule: 2026-09-26T12:01:24.267Z "Option 1, agreed.", to the coordinator's 11:43:42.784Z (`judgement-c6.md`, "P-74").
- The general sentence: 2026-09-29T14:10:36.799Z, "if it fits, then there should be direct conversion".
- The range: 2026-09-27T19:23:07.996Z, P-77.
- `NN32` into `RR64`: gap-ledger row 575, CONTESTED; `Library/FortressLibrary.fsi:300-302` declares no coercion from `NN32`.

Questions for the curator: none.

## P-146

> - P-146 **In a self-typed trait, the compiled checker types `self` in the method bodies as also being the implementing type.** A self-typed trait is a trait `C[\X\]` whose parameter `X` extends `C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`. In its method bodies, `self` has the type `C[\X\] & X`. The method signatures keep the plain trait type, because the proofs of the POPL 2019 paper on multiple dispatch (Park, Hong, Steele and Ryu) assume that no declared type holds a type parameter inside an intersection. The checker refuses a type that extends such a trait at another type, since an extender must be a subtype of the static argument that it gives: `object Bad extends Integral[\ZZ32\]` is refused, because `Bad` is not a `ZZ32`. Scala has the same rule for self types. The library's text gains no self type and no `comprises` clause, and walk is unchanged. The rule accepts every self-typed method body of the library except `Integral`'s `numerator`, which each integer type declares instead. Why: the checker reads the library as the team wrote it, as P-44 does for the closure of `AnyIntegral`, by one rule that peer languages share. Built (F-225 states the rule as built).

Meaning: unchanged.
- The conformance rule is stated in the entry, since only this decision uses it (`check.md`, "P-146"; `Specification/basic/traits.tex:296-301`; SLS 2.13 §5.1, quoted at `reviews/self-typed-bodies-ways.md:304`).
- "As also being the implementing type" matches the title to the body's `C[\X\] & X`.

Sources:
- The rule, the examples `Integral` and `Bad`, and "walk is unchanged": 2026-10-13T23:37:34.404Z "1.", to the coordinator's 23:32:24.772Z (`judgement-c5.md`, "P-146").
- The paper's assumption: the coordinator's 23:24:28.785Z; `research/extracts/ParkPOPL2019-extract.md:258-264`.
- `numerator`: 2026-10-14T07:10:28.105Z.
- The reason: his 23:32:10.196Z, "option 1 is more in line with weak signal from repo and has precedent in other languages as well".
- The title's "(way 6)" left in the first round. Review-queue item 1 and `fortress-repo/references/sources.md:639` quote the old title, and the coordinator updates them.

Question for the curator:
1. As built, the rule also accepts a trait that extends a self-typed trait at its own bounded parameter, as the team's `ContainmentBySubset` and `ContainmentByComparison` do. The coordinator took that widening on 2026-10-14 at 00:08 UTC, and it waits for your review (the audit's drafted review item for chunk c5). Read alone, the entry's refusal sentence refuses those two traits. Should the entry name the widening as the coordinator's call, or leave it to the review item? (The takeaway's fix, `takeaway-c5.md:40`.)

## P-153

> - P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction.** Each integer type's `^` returns its own type at every exponent. At a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. A program that wants a fraction writes a float or rational base, as in `2.0^(-1)`. Why: the team's later code gives an integer power the type of its integer base at a signed exponent (P-26, the team's later work outweighs the specification's early text). Overloads choose by type, and no type tells a negative exponent from a non-negative one, since a signed integer or a numeral can be either. So the split is on the base, and the sign of the exponent is tested at run time, as the library tests a value's sign everywhere (P-80, run-time sign tests in place of sign-refined types). Built in the interpreter's library and under walk, at an exponent of any integer type (F-263 states it as built). Still to build: the same rule on the compiled path, whose own powers give 0 at a negative exponent and a raw Java exception at a base of 0 (gap-ledger row 441), and overflow silently or with a raw Java exception (row 523); PLAN, phase 4, the natives, binds the library's `^` to compiled helpers.

Meaning: unchanged.
- "No type tells a negative exponent from a non-negative one, since a signed integer or a numeral can be either" says what "no type carries the sign" meant. The cold reader read it against `NN32` (`check.md`, "P-153"). The ask's words: "the way the library tests a sign everywhere since you set aside the sign-refined types" (2026-10-20T00:19:08.321Z).
- "At an exponent of any integer type" is the built state (F-263), not his decision.
- "The interpreter's library": each path has its own library today (`fortress-repo` SKILL.md, "How a program runs").

Sources:
- The rule and the reason: 2026-10-20T00:44:34.730Z "Yes.", to option 1 of the coordinator's 00:19:08.321Z (`judgement-c7.md`, "P-153").
- The title: the split that he recalled at 05:56:19.215Z, "We designed some kind of split solution." (`corrections-c7.md`, "P-153", sentence 1).
- "Still to build": the audit's text (`corrections-c7.md`, "P-153", sentence 3), with the rows' own texts. Its timing, phase 4, is an agent's default that the audit drafted for the review queue.

Questions for the curator: none.

## P-67

> - P-67 **`round` on an exact half goes to the even integer, on both paths.** Under walk and on the compiled path, `round(2.5)` gives 2: an `RR64` or `RR32` value rounds an exact half to the even integer, as a rational does. This is the specification's rule for rationals, the default rounding of IEEE 754, and the rule of the team's own `round` on rationals. Built.

Meaning: unchanged. No change in this round; the check and the cold read pass it.

Sources:
- 2026-09-21T21:03:23.920Z "Agreed, but I want historical evidence", to the coordinator's 20:57:43.103Z: "Half to even on both paths. The spec's rule, IEEE's default, and the team's own rational body." (`judgement-c5.md`, "P-67").
- The float types: gap-ledger row 329, "`round` on an exact half for the float types" (`P-67.md`, section 3).
- "Built": `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:133` all use `Math.rint` (`P-67.md`, section 2).

Questions for the curator: none.
