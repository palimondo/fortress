<!-- Cold read of the ten POSITIONS entries in pilot/clean.txt, by a reader who saw only CLAUDE.md, the fortress-repo skill's SKILL.md and its references (not revival-changes.md, not sources.md). -->

# Cold read of `pilot/clean.txt`

What I read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; from its `references/`, `compiler.md`, `library.md`, `interpreter.md`, `records.md`, the head of `exploring.md`, and greps of the others for terms. Not `revival-changes.md` or `sources.md`, and nothing in the record. So every P-, F-, ledger-row and PLAN reference below was taken as a pointer I could not follow. I note the places where an entry depends on one of them to be understood.

The entries are taken in the file's order.

---

## P-45: Overloaded declarations may differ in their static parameters

1. **Decided:** The specification drops its rule that overloaded declarations must have the same static parameters, and states the overloading model of the type group's 2011 paper in its place, keeping the old sentence marked as superseded. The compiled checker, which already follows the paper, keeps its three rules (No Duplicates, Meet, Return Type) and checks the Return Type Rule over every instance of a generic declaration. One restriction remains: when one generic declaration is more specific than another, the two must have matching static parameters position by position, as Java requires of an overriding generic method. Walk dispatches by the declared parameter types, not by the order the declarations are written in. At load it checks pairs of generic declarations by the checker's rules on those declared types, and it must accept exactly the pairs the checker accepts. Where the checker refused a library overload set, the library fixes it by adding its own exclusion declarations. The microGPT programs are not changed.
2. **Applies:** To overload sets of functions and methods: in the specification's text, in the compiled checker, and in walk's check at load and its dispatch. Limits: the agreement rule covers only a pair of generic declarations in which one is more specific. Two declarations that are not ordered, or a generic and a non-generic one, may differ freely. Walk's check is made on declared types, not on instances. (The skill adds a limit the entry leaves out: walk does not check functional methods of a generic trait or object at load, `interpreter.md`, "What walk checks".)
3. **Requires:** Do not reinstate the old rule. Keep walk's check and the checker in step: a change to either one's acceptance of a pair must keep the other the same, or it is a defect. Do not choose walk's overload by textual order. Repair a refused library overload set with an exclusion declaration in the library, never by changing microGPT.
4. **Unfinished:** The pairs that walk and the checker still judge differently. The entry only names them by citation (F-26; ledger rows 539, 759, 779, 780, 786 to 788; PLAN phase 3 item 19), so I cannot say which pairs they are.
5. **Could not resolve:**
   - "may differ in their static parameters" (title) against "the two must agree on their static parameters position by position". *Unclear wording.* The title reads as a general freedom, and the body takes it back for the commonest case (one declaration more specific than another). I settled on the reading above, but a reader who skims the title will take away the wrong rule. The entry should say which pairs may differ.
   - "agree ... position by position". *Unclear wording.* Agree in number only, or in number and kind, or in bounds too (after renaming)? Java's rule, the one cited, requires the same bounds. Does the entry intend that?
   - "every instance of a generic declaration". *Two readings:* every possible instantiation (a universally quantified check), or every instance that a program actually makes. I took it as the first.
   - "every pair of generic declarations". *Two readings:* both declarations generic, or at least one. `interpreter.md` says "every pair of functions of which at least one is generic", so the entry's wording is narrower than the skill's.
   - "also where no pair of their parameter types excludes". *Unclear wording.* A pair in which some parameter types exclude has disjoint domains and passes trivially, so I cannot see what "also" adds or what earlier behaviour it rules out. Perhaps walk once skipped the overlapping pairs, but the entry does not say.
   - "The library repairs the overload sets that the checker refused with exclusion declarations of its own". *Unclear wording (attachment).* It can be read as "refused [by means of] exclusion declarations of its own". I took "with ... of its own" to go with "repairs", meaning the library's own declarations. "exclusion declarations" presumably means `excludes` clauses, but the entry does not say so. Tense: is this a rule for future repairs, a description of repairs already made, or both?

## P-50: The body of a `label` expression, and each value an `exit` gives it, take the expected type of the whole `label`

1. **Decided:** When the compiled checker checks a `label` expression that has an expected type, it passes that type down as the expected type of the body and of each `exit ... with` value, as it already does for each `typecase` clause. The basis is that the specification types a `label` as the union of its body's last expression and its exit values, and that its inference chapter names these as contexts that carry an expected type.
2. **Applies:** To the compiled checker, at every `label` with an expected type. Walk has no static types, so the entry does not concern it. (`compiler.md` says the code generator has no case for `label` and `exit`, so a program that passes this check still cannot be compiled. The entry does not say so, but nothing in it contradicts it.)
3. **Requires:** Keep the propagation. Do not type a `label`'s body or exit values without the outer expected type when there is one.
4. **Unfinished:** Nothing ("Built (F-87)").
5. **Could not resolve:**
   - "lists both as contexts". *Two readings:* "both" may be the body and the exit values, or `label` and `typecase`. The meaning comes out the same either way.
   - What happens when the `label` has no expected type? I assume the union rule alone applies, but the entry does not say. *Unclear wording (missing limit),* minor.

## P-51: The checker retries a call written as another call's argument against each declaration's parameter type

1. **Decided:** The compiled checker first makes its usual attempts at an outer call. If none of them succeeds, it checks each inner call (an argument that is itself a call) again, once for each declaration of the outer function, using that declaration's parameter type as the inner call's expected type. The retry applies to any inner call whose static arguments are inferred, not only to one whose type parameter appears only in its result type. The reason is one inference rule in every context.
2. **Applies:** To the compiled checker only, and only after every normal attempt at the outer call has failed. It covers inner calls with inferred static arguments, so I read an inner call with written static arguments, or to a non-generic function, as outside it.
3. **Requires:** Do not narrow the retry back to the case where the type parameter appears only in the result type. Keep the retry after the attempts that P-49 orders, not before them.
4. **Unfinished:** Nothing ("Built; it repairs gap-ledger row 455").
5. **Could not resolve:**
   - "the checker's attempts (P-49 gives their order)". *Depends on another entry.* This entry does not say what an attempt is (one per overload? with and without an expected type?), so the retry's trigger is only half defined without P-49.
   - What does a successful retry lead to? If the inner call checks under declaration D's parameter type, is the outer call then resolved to D, or are the normal attempts run again? What if retries succeed for several declarations? *Unclear wording (missing outcome).*
   - "that declaration's parameter type". *Unclear wording:* the parameter at the inner call's position, presumably. If the outer declaration is generic, its parameter type contains its own static parameters. Are they used open, or replaced by their bounds?
   - "Here the outer call is the call that the compiled checker checks". *Unclear wording,* minor: the checker checks both calls. I took it to mean "the call being resolved".

## P-12: The compiled type checker is made to check the programs that walk runs, after the switch-over

1. **Decided:** The compiled checker is to become usable on walk's programs. Today `fortress typecheck` checks only against the compiler's prelude, so it says nothing about a walk program. The switch-over moves the compiled path onto walk's library. After that, the checker runs on walk's programs. Walk will also stop choosing a coercion by the run-time value and will use the static coercions that the checker inserts.
2. **Applies:** After the switch-over, which is described in SKILL.md as coming once the checker accepts the interpreter's library. Before then, nothing changes.
3. **Requires:** Do not treat `fortress typecheck` as a check of a walk program today. Do not start either step before the switch-over (implied by "after the switch-over").
4. **Unfinished:** "both steps".
5. **Could not resolve:**
   - "both steps". *Two readings:* (a) the switch-over, then walk's use of the static coercions; (b) the checker running on walk's programs, then walk's use of the static coercions, with the switch-over counted as a separate prerequisite. The entry lists three things (the switch-over, the checker on walk's programs, walk's use of the coercions) and calls them two steps.
   - "the checker runs on walk's programs". *Two readings:* `fortress typecheck` becomes a valid check of a walk program, or walk itself turns its type-checking phase on and refuses ill-typed programs. Using the checker's coercions suggests the second. If so, walk would begin refusing programs it now runs, a large change that the entry leaves implicit.
   - "in place of its choice on the run-time value (P-59)". *Depends on another entry* for the detail. The meaning is clear enough from `interpreter.md`'s note that walk chooses a coercion at run time.

## P-29: Walk's speed is irrelevant to every judgement of Fortress's performance

1. **Decided:** Walk's timings count for nothing in judging Fortress's speed. Performance is judged on the compiled path, once microGPT runs there. Until then, C4 (the flat microGPT program) is not edited for speed. The gate never runs the two microGPT programs, because they are too long to be tests.
2. **Applies:** To every performance judgement or decision. The edit freeze on C4 lasts until microGPT runs compiled.
3. **Requires:** Base no performance decision on a walk timing. Do not edit C4 for speed before microGPT runs compiled. Do not add a microGPT run to the gate. (`gate.md` agrees: the gate compiles the microGPT components and never runs them.)
4. **Unfinished:** Nothing stated. The entry's condition, microGPT running compiled, is itself still to come.
5. **Could not resolve:**
   - "no edit is made to C4 ... for speed". *Unclear wording (limit):* only C4 is named. May the APL-style program be edited for speed in the meantime, or does C4 stand for both?
   - "C4". *Unclear wording,* minor: a label with no other use in the skill, which names files such as `MicroGptFlatQuick.fss` and `MicroGptFlatCheck.fss`. Is C4 one of those files, or the program behind all of its variants?
   - The entry does not say whether a worker may make walk faster. The skill forbids it (`interpreter.md`: "Do not edit anything to make walk faster"), but the entry, whose title implies it, does not state it.

## P-40: Sizes are checked, and a size that inference leaves unknown is an error only where it is used

1. **Decided:** A size is a `nat` or `int` static parameter. The compiled checker checks sizes and refuses a value outside `NN32` (for `nat`) or `ZZ32` (for `int`). Where a JVM array is created, a length over 2^31-1 is refused. A size that inference cannot fix is an error only when it is used (in a type, a name or a value), not merely for existing. When the declaration that a call would choose needs a size the call cannot fix, the checker refuses the call outright, even within an overload set, and does not skip to another declaration. In the exclusion rule, differing static arguments of any kind except `opr` make two instantiations exclude. Boolean arguments will count once the checker supports boolean parameters. A size used as a value converts to `ZZ32`, as a numeral does. The 17 vector and matrix operators of the `FortressLibrary` api drop their unused size parameters by a given patch, completing the team's 2008 fix, which removed them from the component only.
2. **Applies:** To static size parameters in the compiled checker, the exclusion rule and the `FortressLibrary` api. The JVM-length refusal applies only where "the array design" makes a JVM array, and it has a walk counterpart (ledger row 527).
3. **Requires:** Do not let overload resolution pass over a declaration whose size the call cannot fix. Do not report an unfixed size that is never used. Treat a size as a `ZZ32` value. Do not treat two instantiations that differ only in an `opr` argument as excluding.
4. **Unfinished:** The refusal of a JVM array length over 2^31-1 (PLAN phase 5, and under walk ledger row 527). The compiled half of the refusal of a call (ledger row 400). Boolean arguments in the exclusion rule (ledger row 406).
5. **Could not resolve:**
   - "Where the array design creates a JVM array, it refuses a length over 2^31-1." *Unclear wording on several counts.* "The array design" is a record term (`compiler.md` points to a POSITIONS entry of that name) and is not defined here. "It" grammatically means the compiled checker, yet "Still to build" gives a walk half (row 527). Is the refusal static, at check time, or a run-time error at creation? A length is often not static.
   - "reaches a type, a name or a value". *Unclear wording:* I cannot tell what it means for a size to reach a name. Bound to a variable? Named in a body as a static parameter? The rest of the line is clear.
   - "needs a size that the call cannot fix". *Two readings:* has a size parameter that the call does not fix, or uses one (in the sense of the sentence before). Under the first, the call is refused even when the size is never used, which contradicts the sentence before.
   - "the checker refuses the call" against "Still to build: the compiled half of the refusal of a call". *Unclear wording:* the decision is stated in the present tense as the checker's behaviour, yet its compiled half is unbuilt. The checker is compiled-path code, so which half is built? Walk's, at run time? And what is the "compiled half": the checker, or the code generator?
   - "boolean arguments join". *Two readings,* and the entry and the skill use "join" in different senses. The skill defines "join" as the least common supertype. Here it seems to mean "join [the arguments that tell instantiations apart]". It should be reworded.
   - "converts to `ZZ32`, as a numeral does". *Two readings:* the value has type `ZZ32` exactly, or it behaves like a numeral (taking `ZZ32` by default and coercing further, for example into `RR64`). Also unstated: a `nat` value between 2^31 and 2^32-1 does not fit `ZZ32`.
   - "lose their unused sizes by the change in `perf-probes/array-sites/e3-rebased.patch`". *Unclear wording:* has the patch landed? It is not in "Still to build", so presumably yes, but a patch file suggests it was not applied. The path also lacks its `explorations/` prefix, if that is where it is.
   - "the exclusion rule". *Concept partly found:* SKILL.md gives "No type may extend two instantiations of one generic trait". I inferred that two distinct instantiations therefore exclude, and that this is the rule meant here. The entry would be clearer if it said so.

## P-74: Mixed integer widths convert by declared coercions

1. **Decided:** Each wider number type declares a `coerce` from each narrower one, as the compiler's prelude already does. An exact conversion is implicit, and a lossy one must be written out. So `ZZ32` and numerals convert into `RR64` implicitly, while `ZZ64` into `RR64` is explicit. A generic call with arguments of mixed widths infers the narrowest type that all its arguments coerce into. Ranges are over `ZZ32` only. The specification's `widens` declaration is deferred.
2. **Applies:** To the number types of the library, implicit conversions, and the inference of a generic call's static arguments from mixed-width arguments. The entry does not say which path does the inference: the checker, walk (which infers from run-time types), or both.
3. **Requires:** Add a `coerce` only for an exact conversion. Make a lossy conversion explicit. Do not build `widens`. Do not add ranges over other integer types.
4. **Unfinished:** `NN32` into `RR64` ("Built, except ... (P-75)").
5. **Could not resolve:**
   - "wider". *Unclear wording,* minor: the term must mean "holds every value of the other exactly", since `RR64` counts as wider than `ZZ32` but `ZZ64` does not coerce into it. Read as "more bits", the first sentence contradicts the second.
   - "the specification's `widens` declaration". *Language concept I lack;* the skill does not define it. I could only guess that it marks a coercion as a widening one for transitive or inference purposes.
   - "Built, except `NN32` into `RR64` (P-75)". *Two readings:* `NN32` into `RR64` is still to build, or P-75 decided not to build it (or to handle it differently). The entry does not say which, and P-75 holds the answer.
   - "mixed integer widths" (title) against a body that is half about `RR64`. *Unclear wording,* minor: the title understates what the entry covers.

## P-146: In a self-typed trait, the compiled checker types `self` in the method bodies as the implementing type

1. **Decided:** A self-typed trait is `C[\X\]` with `X extends C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`. In its method bodies, the checker gives `self` the type `C[\X\] & X`. Method signatures keep the plain `C[\X\]`, because the POPL 2019 proofs assume no declared type holds a type parameter inside an intersection. The checker refuses an extender that instantiates the trait at a type other than itself, such as `object Bad extends Integral[\ZZ32\]`. No self type and no `comprises` clause is added to the library, and walk is unchanged. With this rule, every self-typed method body in the library checks except `Integral`'s `numerator`, which each integer type now declares itself.
2. **Applies:** To the compiled checker, on traits of that F-bounded form. It does not apply to walk, nor to the declared signatures.
3. **Requires:** Do not add self types or `comprises` clauses to the library to make self-typed bodies check. Do not put the intersection into method signatures. Do not change walk for this. Keep `numerator` on the integer types, not on `Integral`.
4. **Unfinished:** Nothing ("Built (F-225)").
5. **Could not resolve:**
   - "by Scala's conformance rule". *Language concept, partly from my training:* I take it to be Scala's rule that a class must conform to the self types of the traits it extends, so `Bad` would have to be a `ZZ32`. The skill does not state the rule, and a reader who does not know Scala would not know which rule is meant. One clause stating it would help.
   - "the implementing type" (title) against `C[\X\] & X` (body). *Unclear wording,* minor: the body is exact, and the title loosely says `X`.

## P-153: The integer power splits on the base

1. **Decided:** For an integer base, `^` returns the base's own type at every exponent. At a negative exponent, bases 1 and -1 give their exact result, base 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. A fraction requires a float or rational base, as in `2.0^(-1)`. The choice is made by the base's type, because overloads dispatch on types and no type tells the sign of an exponent. The sign is tested at run time.
2. **Applies:** To `^` on every integer type, in the library and under walk. The compiled path is still to follow.
3. **Requires:** Do not make an integer `^` return a fraction or a float. A program or test that wants a fraction writes a float or rational base. On the compiled path, build the same rule.
4. **Unfinished:** The compiled path's own powers by the same rule (ledger rows 441 and 523; PLAN phase 4, the natives).
5. **Could not resolve:**
   - "sign-refined subset" (in "as the library tests every sign-refined subset (P-80)"). *Language concept I lack;* the skill does not define it. Perhaps the non-negative or positive subsets of an integer type, which the library checks at run time rather than as types. The decision is clear without it.
   - "no type carries the sign of an exponent or a numeral". *Unclear wording,* minor: `NN32` and `NN64` are non-negative types, so in a sense they do carry a sign. I took it to mean that within a signed type nothing separates negative from non-negative values, and that numerals do not bind to `NN` types (`tests-writing.md`, ledger row 454).
   - The exponent's type is not stated. Must it be an integer, of the same type as the base or of any width? What about an integer base with a float exponent? *Unclear wording (missing limit).*

## P-67: `round` on an exact half goes to the even integer, on both paths

1. **Decided:** On both paths, `round` on an `RR64` or `RR32` exact half goes to the even integer (`round(2.5)` is 2), matching rationals, IEEE 754's default and the team's `round` on rationals.
2. **Applies:** To `round` on `RR64`, `RR32` (and rationals), under walk and on the compiled path. Other rounding functions are not affected.
3. **Requires:** Keep ties-to-even on both paths. Do not round half away from zero.
4. **Unfinished:** Nothing ("Built").
5. **Could not resolve:** Nothing.

---

## Summary, one line per entry

- P-45: blocked in part. The title's freedom conflicts with the agreement rule in the body; "agree position by position", "every instance", "pair of generic declarations" (both or one?) and "also where no pair ... excludes" each read two ways or are opaque; "repairs ... with exclusion declarations of its own" misattaches.
- P-50: clear (minor: "both"; no rule stated when the `label` has no expected type).
- P-51: mostly clear. "The checker's attempts" needs P-49. The outcome of a successful retry is not stated.
- P-12: blocked in part. "Both steps" counts three things as two; "the checker runs on walk's programs" could mean walk itself starts refusing ill-typed programs.
- P-29: clear (minor: is the speed freeze on C4 alone, or on the APL-style program too; what is "C4" as a file).
- P-40: blocked in part. "Where the array design ... it refuses" (undefined term, unclear referent, static or run time?); "reaches ... a name"; "needs a size" two ways; present-tense refusal against an unbuilt "compiled half"; "join" clashes with the skill's term; "converts to `ZZ32`, as a numeral does" two ways; has the patch landed?
- P-74: mostly clear. `widens` is a concept I lack; the status of `NN32` into `RR64` depends on P-75; "wider" needs a definition; the path of the generic inference is unstated.
- P-146: clear (minor: "Scala's conformance rule" is not stated, which leaves a reader without Scala guessing).
- P-153: clear (minor: "sign-refined subset" is a concept I lack; the exponent's type is not stated).
- P-67: clear.
