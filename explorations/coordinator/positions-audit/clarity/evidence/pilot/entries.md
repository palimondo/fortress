## P-45

Now:

> - P-45 **Overloads may differ in their static parameters (answer 9).** The specification drops its sentence that forbids it and states the type group's 2011 model, which the checker runs; the old sentence stays as superseded text. The checker keeps the paper's three overloading rules, checks the Return Type Rule over every instance, and requires two generic declarations in the more-specific relation to agree on their static parameters position by position, as Java's overriding rule does (row 398). Walk dispatches on declared domains, not by the order of the declarations, and its load check reads every pair of generic declarations on their declared domains by the checker's rules, with no parameter pair required to exclude, so that walk and the checker accept the same pairs (row 159). The library repairs its refused families with its own exclusions, and no model line changes. The judgement's smaller choices took the record's defaults, listed for his review in `PLAN.md`. Built: walk's load check over every pair of functions with static parameters, by climb batch 17's rung G. Not built: a functional method of a generic trait or object is still compared on its instances (F-26), the Meet Rule's search matches only some domains (row 539), two nested generic functional methods of a trait or object are refused at load where the same two functions load (row 779), and in a trait with static parameters load and fail at a call (row 780). Rung G's reading makes walk and the checker disagree on row 759's pair: walk refuses `g[\T\](a: T)` beside `g(a: Any)`, and the checker accepts it. Climb batch 19's reading of exclusion (P-152) leaves three more, rows 786 to 788.

Proposed by the audit:

> - P-45 **Overloads may differ in their static parameters.** The specification drops its sentence that forbids it and states the type group's 2011 model, which the checker runs; the old sentence stays as superseded text. The checker keeps the paper's three overloading rules, checks the Return Type Rule over every instance, and requires two generic declarations in the more-specific relation to agree on their static parameters position by position, as Java's overriding rule does (row 398). Walk dispatches on declared domains, not by the order of the declarations, and its load check reads every pair of generic declarations on their declared domains by the checker's rules, with no parameter pair required to exclude, so that walk and the checker accept the same pairs (row 159). The library repairs its refused families with its own exclusions, and no model line changes. Still to build: the pairs that walk or the checker still reads otherwise (F-26; rows 539, 759, 779, 780 and 786 to 788; PLAN, phase 3, item 19).

Evidence: explorations/coordinator/positions-audit/full/evidence/P-45.md; explorations/coordinator/positions-audit/full/evidence/judgement-c3.md:103; explorations/coordinator/positions-audit/full/evidence/corrections-c3.md:149; explorations/coordinator/positions-audit/full/evidence/takeaway-c3.md:66

## P-50

Now:

> - P-50 **A `label` body takes the expected type of the whole `label` (item 48 (a)).** The specification types a `label` as the union of its body's last expression and its exits' `with` values. So the checker passes the expected type of the whole into the body and into the exits' values, as for a `typecase` clause, and the inference chapter lists both contexts. P-51 is the other half of item 48. Row 642 stays `CONTESTED` only because the ledger's tool cannot close it.

Proposed by the audit:

> - P-50 **A `label` body takes the expected type of the whole `label`.** The specification types a `label` as the union of its body's last expression and its exits' `with` values. So the checker passes the expected type of the whole into the body and into the exits' values, as for a `typecase` clause, and the inference chapter lists both contexts. P-51 is the other half of item 48.

Evidence: explorations/coordinator/positions-audit/full/evidence/P-50.md; explorations/coordinator/positions-audit/full/evidence/judgement-c3.md:207; explorations/coordinator/positions-audit/full/evidence/corrections-c3.md:295; explorations/coordinator/positions-audit/full/evidence/takeaway-c3.md:153

## P-51

Now:

> - P-51 **A call written as another call's argument is retried against each declaration's parameter type (item 48 (b), row 455).** When the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate's parameter type as its expected type. The trigger is wide: any inferred static argument, not only a result-only type parameter. Why: it makes the inference rules one rule everywhere, past the cases the team built. Its probe moves no error of the distance. Its rung promotes the expected failures `XXXInferContextDrops` and `XXXInferLoneUnionClosedTrait`, whose refusals it repairs. Built by climb batch 14 (`0856f3e6a`).

Proposed by the audit:

> - P-51 **A call written as another call's argument is retried against each declaration's parameter type (row 455).** When the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate's parameter type as its expected type. The trigger is wide: any inferred static argument, not only a result-only type parameter. Why: it makes the inference rules one rule everywhere, past the cases the team built. Its probe's measurement is in `reviews/argument-context-probe.md`. Built.

Evidence: explorations/coordinator/positions-audit/full/evidence/P-51.md; explorations/coordinator/positions-audit/full/evidence/judgement-c4.md:20; explorations/coordinator/positions-audit/full/evidence/corrections-c4.md:26; explorations/coordinator/positions-audit/full/evidence/takeaway-c4.md:20

## P-12

Now:

> - P-12 **The type checker on interpreter programs comes after the switch-over.** He wants the checker usable on the programs that walk runs, and sees it as low-hanging fruit. Today it checks only against the compiler's prelude (F-9). It comes once walk also takes the static coercions that the checker inserts (P-59).

Proposed by the audit:

> - P-12 **The type checker on interpreter programs comes after the switch-over.** He wants the checker usable on the programs that walk runs. Today it checks only against the compiler's prelude (F-9). It comes once walk also takes the static coercions that the checker inserts (P-59).

Evidence: explorations/coordinator/positions-audit/full/evidence/P-12.md; explorations/coordinator/positions-audit/full/evidence/judgement-c1.md:90; explorations/coordinator/positions-audit/full/evidence/corrections-c1.md:124; explorations/coordinator/positions-audit/full/evidence/takeaway-c1.md:85

## P-29

Now:

> - P-29 **Walk's speed is irrelevant to every judgement of Fortress's performance.** Walk is hundreds of times slower than Python's interpreter. So no performance decision of any kind, and no edit of C4, the flat model program, for speed, until microGPT runs compiled. The gate never runs the two microGPT programs, too long-running to be tests: it compiles them and records the phase that each reaches. A run of them, once possible, goes to a stage that does not gate.

Proposed by the audit:

> - P-29 **Walk's speed is irrelevant to every judgement of Fortress's performance.** Walk is far slower than Python's interpreter (`explorations/microgpt-port.md`, "Step-0 results"). So no performance decision rests on walk's timings, and no edit of C4, the flat model program, is made for speed until microGPT runs compiled. The gate never runs the two microGPT programs, too long-running to be tests.

Evidence: explorations/coordinator/positions-audit/full/evidence/P-29.md; explorations/coordinator/positions-audit/full/evidence/judgement-c2.md:62; explorations/coordinator/positions-audit/full/evidence/corrections-c2.md:87; explorations/coordinator/positions-audit/full/evidence/takeaway-c2.md:60

## P-40

Now:

> - P-40 **Sizes are checked, and a size left unknown is an error only where it is used.** The checker checks `nat` and `int` static parameters and refuses a size beyond `NN32` or `ZZ32` (F-140). Storage refuses a JVM array length over 2^31-1. A size that inference leaves unknown is an error only when it reaches a type, a name or a value. How the checker represents it is not his choice. A size that a call cannot fix refuses the call, also inside an overload set, instead of dropping the arm (row 400, its compiled half open). Every static argument but an operator counts in the exclusion rule; booleans join once the checker has boolean parameters (row 406). A size used as a value converts to `ZZ32` as a numeral does (row 485). The unused sizes of the api's 17 vector and matrix operators go by decision E's diff, which he read and took for the switch-over (ask 3, 2026-10-20; `perf-probes/array-sites/e3-rebased.patch`): it finishes the team's own fix of 2008, which took them out of the component only (F-35), and is built, with the array sites' other fixes. The other unused sizes of the 25 go only by a diff shown to him.

Proposed by the audit:

> - P-40 **Sizes are checked, and a size left unknown is an error only where it is used.** The checker checks `nat` and `int` static parameters and refuses a size beyond `NN32` or `ZZ32` (F-140). Where the array design creates a JVM array, it refuses a length over 2^31-1; not built yet (PLAN phase 5; under walk, row 527). A size that inference leaves unknown is an error only when it reaches a type, a name or a value. A size that a call cannot fix refuses the call, also inside an overload set, instead of dropping the arm (row 400, its compiled half open). Every static argument but an operator counts in the exclusion rule; booleans join once the checker has boolean parameters (row 406). A size used as a value converts to `ZZ32` as a numeral does (row 485). The unused sizes of the api's 17 vector and matrix operators go by decision E's diff, which he read and took for the switch-over (`perf-probes/array-sites/e3-rebased.patch`): it finishes the team's own fix of 2008, which took them out of the component only (F-35).

Evidence: explorations/coordinator/positions-audit/full/evidence/P-40.md; explorations/coordinator/positions-audit/full/evidence/judgement-c2.md:206; explorations/coordinator/positions-audit/full/evidence/corrections-c2.md:276; explorations/coordinator/positions-audit/full/evidence/takeaway-c2.md:202

## P-74

Now:

> - P-74 **Mixed integer widths convert by declared coercions (answer 8, to PLAN item 8): each wider type declares a `coerce` from each narrower one, as the compiler prelude does.** An exact conversion is implicit and a lossy one explicit: `ZZ32` and integer numerals coerce into `RR64`, and `ZZ64` into `RR64` stays explicit (P-66). A generic call or a range over mixed widths infers the narrowest type that both sides coerce into. The specification's `widens` is deferred. Built; no model line changed.

Proposed by the audit:

> - P-74 **Mixed integer widths convert by declared coercions: each wider type declares a `coerce` from each narrower one, as the compiler prelude does.** An exact conversion is implicit and a lossy one explicit: `ZZ32` and integer numerals coerce into `RR64`, and `ZZ64` into `RR64` stays explicit (P-66). A generic call over mixed widths infers the narrowest type that both sides coerce into; a range is over `ZZ32` only (P-77). The specification's `widens` is deferred. Built.

Evidence: explorations/coordinator/positions-audit/full/evidence/P-74.md; explorations/coordinator/positions-audit/full/evidence/judgement-c6.md:80; explorations/coordinator/positions-audit/full/evidence/corrections-c6.md:95; explorations/coordinator/positions-audit/full/evidence/takeaway-c6.md:50

## P-146

Now:

> - P-146 **The checker reads `self` in a self-typed trait's method bodies as the implementing type (way 6).** In a trait `C[\X\]` whose parameter `X` extends `C[\X\]`, `self` in the trait's method bodies has the type `C[\X\] & X`; the signatures keep the plain trait type, as the POPL 2019 paper's assumption on declared types needs. A type that extends such a trait at another type is refused, Scala's conformance rule. The library's text gains no self type and no `comprises` clause, and walk is unchanged. It clears 29 sites of the distance; the thirtieth takes one `numerator` per integer type. Why: it reads the library as the team wrote it, as P-44 does, by one rule the peers share. Built by climb batch 14 (`1c32ccffd`).

Proposed by the audit:

> - P-146 **The checker reads `self` in a self-typed trait's method bodies as the implementing type (way 6).** In a trait `C[\X\]` whose parameter `X` extends `C[\X\]`, `self` in the trait's method bodies has the type `C[\X\] & X`; the signatures keep the plain trait type, as the POPL 2019 paper's assumption on declared types needs. A type that extends such a trait at another type is refused, Scala's conformance rule. The library's text gains no self type and no `comprises` clause, and walk is unchanged. It clears every self-typed body of the library but `Integral`'s `numerator`, which each integer type declares instead. Why: it reads the library as the team wrote it, as P-44 does, by one rule the peers share.

Evidence: explorations/coordinator/positions-audit/full/evidence/P-146.md; explorations/coordinator/positions-audit/full/evidence/judgement-c5.md:18; explorations/coordinator/positions-audit/full/evidence/corrections-c5.md:26; explorations/coordinator/positions-audit/full/evidence/takeaway-c5.md:23

## P-153

Now:

> - P-153 **An integer raised to a negative power raises an error; a fraction comes from a float or rational base (contract E, item 58).** Each integer type's `^` answers its own type at every exponent: a negative exponent raises `IntegerOverflow` where the result is no integer, a base of 0 raises `DivisionByZero`, and the bases 1 and -1 give their exact power. A program that wants a fraction writes a float or rational base, as `2.0^(-1)`. Why: the team's later code types an integer power by its integer at a signed exponent (P-26); overloads choose by type, and no type carries an exponent's or a numeral's sign, so the split is on the base, with the sign tested at run time as the library tests every sign-refined subset (P-80). Built in the one library and under walk. Still to build: the compiled path's own powers by the same contract, which answer 0 at a negative exponent today, when phase 4's natives bind the one library's `^` (rows 441 and 523; PLAN, phase 4, the natives).

Proposed by the audit:

> - P-153 **The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction (contract E).** Each integer type's `^` answers its own type at every exponent: a negative exponent raises `IntegerOverflow` where the result is no integer, a base of 0 raises `DivisionByZero`, and the bases 1 and -1 give their exact power. A program that wants a fraction writes a float or rational base, as `2.0^(-1)`. Why: the team's later code types an integer power by its integer at a signed exponent (P-26); overloads choose by type, and no type carries an exponent's or a numeral's sign, so the split is on the base, with the sign tested at run time as the library tests every sign-refined subset (P-80). Still to build: the compiled path's powers by the same contract (rows 441 and 523; PLAN, phase 4, the natives).

Evidence: explorations/coordinator/positions-audit/full/evidence/P-153.md; explorations/coordinator/positions-audit/full/evidence/judgement-c7.md:18; explorations/coordinator/positions-audit/full/evidence/corrections-c7.md:22; explorations/coordinator/positions-audit/full/evidence/takeaway-c7.md:18

## P-67

Now:

> - P-67 **`round` on an exact half goes to the even integer, on both paths.** It is the specification's rule for rationals, IEEE's default and the team's own rational body. Built.

Proposed by the audit:

> - P-67 **`round` on an exact half goes to the even integer, on both paths.** It is the specification's rule for rationals, IEEE's default and the team's own rational body. Built.

Evidence: explorations/coordinator/positions-audit/full/evidence/P-67.md; explorations/coordinator/positions-audit/full/evidence/judgement-c5.md:141; explorations/coordinator/positions-audit/full/evidence/corrections-c5.md:214; explorations/coordinator/positions-audit/full/evidence/takeaway-c5.md:120

