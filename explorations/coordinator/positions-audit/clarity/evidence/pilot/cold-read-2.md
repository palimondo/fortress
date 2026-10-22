<!-- Cold read 2 of the pilot's clean.txt (ten POSITIONS entries), done from CLAUDE.md, the fortress-repo skill's SKILL.md and its references (without revival-changes.md or sources.md). -->

# Cold read 2: `pilot/clean.txt`

What I read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; and, to look up terms, `references/library.md`, `compiler.md`, `interpreter.md`, `records.md`, `specification.md` and `exploring.md`, plus a grep of the other references. I did not read `revival-changes.md`, `sources.md`, the record, git or any report.

How I sorted each unresolved item:

- **concept**: a language or checker idea that I lack and could not find in the skill.
- **wording**: the words are unclear, or can be read two ways.
- **pointer**: a reference that the skill does not explain, such as PLAN.

Plain citations of entries or ledger rows (F-26, row 539, P-49) are not listed below. A worker can print them.

---

## P-45: Overloaded declarations may differ in their static parameters

1. **Decided:** Overloads of one name may have different static parameters, for example a generic declaration next to a non-generic one, or two generic declarations with different parameter lists. The specification's sentence that forbade this stays only as superseded text. In its place the specification gives the overloading model of the type group's 2011 paper, which the compiled checker already followed. The checker keeps the paper's three rules: No Duplicates, Meet and Return Type. It checks the Return Type Rule over every instance of a generic declaration, not over one guessed instance. One piece of the old ban survives: when one generic declaration is more specific than another, their static parameters must line up position by position. Walk picks among overloads by their declared parameter types, never by the order in which they are written. At load, walk judges generic pairs by the checker's rules on declared parameter types. It no longer refuses a pair just because their parameter types do not exclude each other. Walk and the checker must accept the same pairs. Where the checker refused a library overload set, the library is repaired by adding declarations of its own, and microGPT stays unchanged.
2. **Applies:** To checking overload sets: the compiled checker, and walk's check at load. The position-by-position rule applies only to two generic declarations of which one is more specific. One limit stays open for now: walk does not judge two functional methods of a generic trait or object at load. It compares them per call, on the call's instance. That is listed as unfinished.
3. **Requires:**
   - Do not bring back the ban on differing static parameters.
   - Do not check the Return Type Rule on a single guessed instance.
   - Enforce the position-by-position line-up for a more-specific generic pair.
   - Never let walk's choice depend on the order of declarations.
   - Any change to either path's overload check must keep the two paths accepting the same pairs.
   - Repair a refused library overload set with library declarations, never by editing microGPT's two programs.
4. **Unfinished:**
   - Walk compares functional methods of a generic trait or object per call, not at load (F-26).
   - Both paths refuse the paper's own valid example (row 539).
   - Walk refuses two "nested generic functional methods" of a plain trait, and fails at a call on them in a generic trait (rows 779 and 780).
   - Walk and the checker disagree on four kinds of pair (rows 759, 786 to 788).
   - The PLAN item lists all of these rows except 539.
5. **Could not resolve:**
   - "each pair of two generic declarations": must both be generic, or only one? `interpreter.md` says walk checks "every pair of functions of which at least one is generic". The two texts disagree, or this one is loose. **wording**
   - "their static parameters must line up position by position": the same number of parameters only, or also the same kinds and bounds after renaming? Java's rule for generic methods, which the entry cites, suggests both, but the entry does not say. **wording**
   - "every instance of a generic declaration that the argument types allow": every instance that the bounds admit, or only the instances under which some argument types fit both declarations? I know the Return Type Rule for generic declarations only in outline. **concept + wording**
   - "the type group's 2011 paper (`Papers/Types/`)": `exploring.md` cites "the 2012 write-up on the Return Type Rule (`Papers/Types/journal/`)". Are these the same document? If not, which file is meant? **wording / pointer**
   - "keeps it as superseded text": kept where? Quoted in Appendix I, as `specification.md`'s revision form does, or left in the chapter and marked superseded? **wording**
   - "The library repairs, by declarations of its own, the overload sets that the checker refused": a record of work already done, or a rule for future refusals? And "refused": under the old rule, or still refused now? **wording**
   - "where walk or the checker still judges a pair against these rules": the context means "contrary to these rules", but "against" can also mean "by". **wording**
   - "nested generic functional methods of a plain trait": what is nested in what? A generic method inside a trait, or a method with static parameters inside another generic scope? **concept**
   - "PLAN, phase 3, item 19, the next checker batch's candidates": the skill defines neither PLAN nor "checker batch". Is leaving out row 539 a choice, so that a worker should not take it up, or an oversight? **pointer + wording**

## P-50: A `label` body and its `exit` values take the `label`'s expected type

1. **Decided:** When a `label` expression has an expected type, the compiled checker passes that type into the label's body and into each value that an `exit ... with` gives it, as it does for the clauses of a `typecase`. The reason: the specification types a `label` as the union of its body's last expression and its exit values. The specification's inference chapter lists these as contexts that carry an expected type.
2. **Applies:** In the compiled checker, only when the context gives the `label` an expected type. Walk checks no types, so it is unaffected. The code generator cannot compile `label` or `exit` yet (`compiler.md`), so for now this affects checking only. P-51 covers the related case of a call as another call's argument.
3. **Requires:** The checker must not type the body or the exit values without the expected type when one exists. F-87 is the list of contexts that carry an expected type, so a change to such contexts should keep F-87 true.
4. **Unfinished:** Nothing; it is built.
5. **Could not resolve:**
   - "expected type": the skill never defines it. I read it as the checking mode of bidirectional type checking: the type that the context demands of an expression. **concept**, though general knowledge covers it.
   - "The specification's inference chapter lists the body and those values": the team's text, or a revival edit made for this decision? It matters if a worker has to keep Appendix I in step. **wording**
   - An `exit` with no `with`: does it count among "the values that its `exit` expressions give"? **wording**
   - "union": a union type, or the join? **concept**, minor.

## P-51: The checker retries a call written as another call's argument

1. **Decided:** Take `f(g(x))`. If none of the checker's normal attempts accepts it (P-49 gives their order), the checker checks the inner call `g(x)` again, once for each declaration of `f`. Each time it gives `g(x)` that declaration's parameter type at `g(x)`'s position as its expected type. This covers every inner call whose static arguments are inferred, not only one whose type parameter occurs only in its result type. If one retry succeeds, that declaration is kept. If several succeed, the most specific is kept. If none succeeds, the call fails as it would have without the retry. A generic declaration of `f` is first instantiated from the other arguments. The reason: the curator wants inference rules unified across contexts, even beyond what the team built.
2. **Applies:** In the compiled checker only, as a fallback after the normal attempts fail. It applies to an argument that is a call with inferred static arguments.
3. **Requires:**
   - Do not narrow the retry to the result-type-only case.
   - Do not run it before P-49's attempts.
   - When no retry works, report the ordinary failure.
4. **Unfinished:** Nothing; it is built.
5. **Could not resolve:**
   - "As built, a generic declaration of `f` is first instantiated from the other arguments": part of the decision, or only today's implementation, free to change? **wording**
   - The same sentence leaves out the case where the other arguments fix none of `f`'s static parameters, or where `f` has no other arguments. **wording**
   - "The declaration whose retry succeeds is kept": kept as what? As the declaration the outer call is typed against, or only as the source of `g(x)`'s new type, after which `f(g(x))` is checked again? Dispatch is at run time, so does "kept" fix which declaration runs? **wording**
   - "or the most specific of several": what happens when several succeed and none is most specific? **wording**
   - Scope: does the retry recurse for `f(g(h(x)))`? Does it cover an operand of an operator or of juxtaposition, which are calls in Fortress? **wording / concept**

## P-12: After the switch-over, walk runs the compiled checker and uses its static coercions

1. **Decided:** Once the switch-over happens, walk will run the compiled type checker on its programs and gain their static types. It will then use the coercions that the checker inserts, in place of choosing a coercion by the run-time value. Until then, walk is not changed for this, and P-59 governs its coercions. Today `fortress typecheck` checks only against the compiler's prelude, so it does not check walk's programs (F-9).
2. **Applies:** Only after the switch-over, which `SKILL.md` places at the point where the checker accepts the interpreter's library.
3. **Requires:**
   - Before the switch-over, do not wire the checker into walk, and do not change walk's coercion choice for this purpose.
   - Do not treat `fortress typecheck` as a check of a walk program.
4. **Unfinished:** Both steps: walk running the checker, and walk using the checker's coercions. Both come after the switch-over. "PLAN, phase 4" names the batch for the first.
5. **Could not resolve:**
   - After the switch-over, does a checker error stop walk from running the program, as a type error stops a compile? Or does walk run anyway and only use the types it gets? The entry does not say, and this is the main question that a builder of the step would have. **wording**
   - "gains their static types": are the types used for anything beyond coercions, such as instantiating reductions or static arguments? **wording**
   - "PLAN, phase 4, names the batch that gives walk the checker's static types": does that batch also cover the second step, the coercions? The skill does not define PLAN. **pointer**
   - "the static coercions that the checker inserts": `interpreter.md` describes coercion as a desugaring that walk switches off. So who inserts the coercions: the checker, or the coercion desugarer that follows it? **concept**, minor.

## P-29: Walk's speed is irrelevant to every judgement of Fortress's performance

1. **Decided:** Walk's timings count in no performance judgement or decision. Fortress's performance is judged on the compiled path, once the compiler runs programs. Until microGPT runs compiled, the flat microGPT program, C4, is not edited for speed. The gate never runs microGPT's two programs, C4 and the APL-style program, because they run too long to be tests. The reason: walk is the unoptimised path, like a debug build.
2. **Applies:** To every performance judgement. The freeze on C4 lasts until microGPT runs compiled.
3. **Requires:**
   - Do not base a performance decision on a walk timing.
   - Do not edit C4 for speed before microGPT runs compiled.
   - Do not add microGPT runs to the gate. `gate.md` agrees: the gate compiles the programs' components but never runs them.
4. **Unfinished:** Nothing stated.
5. **Could not resolve:**
   - "C4, the flat microGPT program": which file? The skill names `MicroGptFlatQuick.fss` and `MicroGptFlatCheck.fss`. Is C4 one of these, both, or the program they are cut from? **wording**
   - Only C4 is frozen for speed. May the APL-style program be edited for speed? The entry reads either way. **wording**
   - The entry does not say whether walk itself may be made faster. `interpreter.md` forbids it, so the skill settles it, but the entry does not. **wording**, minor.

## P-40: Sizes are checked; an unknown size is an error only where it is used

1. **Decided:**
   - The compiled checker checks sizes, the `nat` and `int` static parameters. It refuses a size beyond the range of `NN32` or `ZZ32` (F-140).
   - Wherever the array design creates a JVM array, the code checks the length at run time and refuses one over 2^31-1.
   - A size that inference leaves unknown is an error only where it reaches a type, a name or a value. So a declaration may declare a size that none of its types uses.
   - A call that cannot fix a size of the declaration it would choose is refused. This holds inside an overload set too: the checker does not skip that declaration and choose another.
   - Under the rule that no type extends two different instantiations of one generic trait, instantiations differ in any static argument except an operator. So `Vec[\3\]` and `Vec[\4\]` are different. Boolean arguments will count once the checker has them.
   - A size used as a number, as in `0#n`, converts to `ZZ32` where one is needed.
   - The 17 vector and matrix operators of the `FortressLibrary` api drop their unused sizes, by a patch that finishes the team's fix of 2008. That fix removed the sizes from the component only.
2. **Applies:** To sizes in the compiled checker, and to the JVM arrays that the array design creates. Operator static arguments are left out of the instantiation rule.
3. **Requires:**
   - Do not let the checker pass over a declaration whose size it cannot fix.
   - Do not report an unused, unknown size as an error.
   - Treat instantiations that differ in a size as different.
   - Convert a size used as a value to `ZZ32` where one is needed.
4. **Unfinished:**
   - The run-time JVM length check waits for the array design (PLAN, phase 5). Under walk, such an array dies with a raw Java exception (row 527).
   - The checker still passes over a declaration whose unfixed size occurs in its own parameter type (row 400).
   - The checker compares no boolean arguments (row 406).
5. **Could not resolve:**
   - "reaches a type, a name or a value": a type and a value I follow. What is it for a size to reach a name? **wording**
   - The entry seems to pull two ways on a call of a declaration whose size is unused, so that no argument can fix it. On one side: "an error only when it reaches a type, a name or a value", and "a declaration may declare a size that none of its types uses, and pass". On the other: "a call that cannot fix a size of the declaration that it would choose is refused". Is such a call refused? Then the declaration is legal but cannot be called without written static arguments. The removal of the 17 operators' unused sizes hints yes. Or does the call rule cover only sizes that are used? **wording**, and this one blocks a builder.
   - "the declaration that it would choose": chosen by what, before the size is fixed? The most specific applicable declaration by the argument types? **wording**
   - "the array design": the skill does not define it. `compiler.md` points to two POSITIONS entries by title words ("Storage is", "array design"), not by number. **pointer**
   - "under walk such an array dies with a raw Java exception (row 527)": this sits inside the unfinished JVM check. Is walk also to get a clean length error, or is this only a note on how walk fails today? **wording**
   - "any static argument but an operator differs": read literally, a type may extend both `T[\+\]` and `T[\*\]`. That is plain, but surprising, and no reason is given. I would want it confirmed. **wording**
   - "once the checker has boolean parameters" against "The checker compares no boolean arguments (row 406)": does the checker lack `bool` static parameters, or have them but not compare them? **wording**
   - "lose their unused sizes by `explorations/perf-probes/array-sites/e3-rebased.patch`": is the patch already applied to `Library/`, or still to apply? "Built" suggests applied, but the source is a patch file under `explorations/`. **wording**
   - "F-140, the bound on both paths": does walk also refuse a size beyond `NN32` or `ZZ32`? The sentence names only the compiled checker. **wording**

## P-74: Mixed integer widths convert by declared coercions

1. **Decided:**
   - Each wider integer type declares a `coerce` from each narrower integer type, as the compiler's prelude does.
   - An exact conversion is implicit, and a conversion that can lose precision is written out. So `ZZ32` values and integer numerals go into `RR64` implicitly, and a `ZZ64` value into `RR64` is written out (P-66).
   - A call of a generic function with arguments of mixed widths infers, on both paths, the narrowest type into which all the arguments coerce.
   - Ranges are over `ZZ32` only (P-77).
   - The specification's `widens` declaration is deferred.
2. **Applies:** To integer types, and to their conversion into `RR64`, on both paths.
3. **Requires:**
   - Declare each coercion in the wider type, in the interpreter's library.
   - Never make a lossy conversion implicit.
   - Do not build `widens`.
   - Do not build ranges over other integer types.
4. **Unfinished:** The implicit coercion of `NN32` into `RR64` (P-75, which holds its conflict with the overloads of `RR64` and `ZZ64`).
5. **Could not resolve:**
   - "wider" and "narrower" across signed and unsigned types: no order is given, and the skill lists only the types. Is `NN32` narrower than `ZZ32`? It is not exactly contained, since `NN32` reaches 2^32-1. Is `ZZ32` narrower than `NN64`? Where does `ZZ` sit? **wording / concept**
   - "the narrowest type into which its arguments coerce": what if no single narrowest one exists? For example, `ZZ64` and `NN64`: is it `ZZ`, or an error? **wording**
   - "integer numerals coerce into `RR64` implicitly": even a numeral beyond 2^53, which is not exact? The exactness rule and this sentence can collide. **wording**, minor.
   - "is deferred": until when? May a worker build it if a task needs it? **wording**
   - Does the exact-or-written-out rule also cover `RR32` and `QQ`, for example `ZZ32` into `RR32`, which is lossy? The title says integer widths, but the second sentence is general. **wording**

## P-146: In a self-typed trait, `self` is also the implementing type in method bodies

1. **Decided:** For a trait `C[\X\]` whose parameter `X extends C[\X\]`, such as `Integral`, the compiled checker types `self` inside method bodies as `C[\X\] & X`. Method signatures keep the plain trait type, because the proofs of the POPL 2019 paper assume that no declared type holds a type parameter inside an intersection. The checker refuses a type that extends such a trait at another type, since an extender must be a subtype of the static argument it gives: `object Bad extends Integral[\ZZ32\]` is refused. Scala has the same rule. The library's text gains no self type and no `comprises` clause, and walk is unchanged. Every self-typed method body of the library passes, except `Integral`'s `numerator`, which each integer type declares instead. The reason: the checker reads the library as the team wrote it, by a rule that peer languages share.
2. **Applies:** In the compiled checker, to F-bounded ("self-typed") traits and their extenders. It does not apply to walk, to the library's text, or to method signatures.
3. **Requires:**
   - Do not put an intersection type into a declared signature.
   - Do not add self-type annotations or `comprises` clauses to the library for this.
   - Refuse an extender that gives a static argument it is not a subtype of.
4. **Unfinished:** Nothing; it is built (F-225).
5. **Could not resolve:**
   - "as P-44 does for the closure of `AnyIntegral`": what is the closure of a trait here? The set of its subtypes, closed by `comprises`? **concept**
   - A generic extender that passes its own parameter on, such as `trait T[\I extends T[\I\]\] extends Integral[\I\]`: is `T[\I\]` a subtype of `I` there, by its own self typing, or is it refused? The rule as worded ("an extender must be a subtype of the static argument that it gives") does not settle it. **wording**
   - Scope: does "self-typed" also cover a parameter bounded by a subtrait of `C[\X\]`, or a trait with several parameters? **wording**
   - "which each integer type declares instead": done, or a requirement on future integer types? "Built" suggests done. **wording**, minor.

## P-153: The integer power splits on the base

1. **Decided:** An integer type's `^` returns that same integer type at every exponent. At a negative exponent, bases 1 and -1 give their exact power, base 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`. A program that wants a fraction writes a float or rational base, as in `2.0^(-1)`. The reasons:
   - The team's later code gives an integer power the type of its base (P-26).
   - Overloads choose by type, and no type tells a negative exponent from a non-negative one. So the split is on the base, and the sign is tested at run time (P-80).
2. **Applies:** To `^` with an integer base and an exponent of any integer type, on both paths.
3. **Requires:**
   - Do not make an integer base return a fraction.
   - Do not split the overloads on the exponent's sign by type.
   - Raise the named Fortress exceptions, not raw Java ones.
4. **Unfinished:** The compiled path. Its powers give 0 at a negative exponent and a raw Java exception at base 0 (row 441), and they overflow silently or with a raw Java exception (row 523). PLAN, phase 4, the natives, binds the library's `^` to compiled helpers.
5. **Could not resolve:**
   - "Still to build: the same rule on the compiled path": before the switch-over, the compiled path's powers are the compiler's prelude, which `compiler.md` says must not gain declarations. Is the fix to wait for phase 4, the binding of the interpreter's library's `^` to compiled helpers? Or are today's compiled helpers to be fixed now, with rows 441 and 523? **wording**
   - "Built in the interpreter's library and under walk": two places, such as the library's `.fss` code and walk's natives, or one said twice? **wording**, minor.
   - `0^0` is not stated. **wording**, minor.

## P-67: `round` on an exact half goes to the even integer, on both paths

1. **Decided:** `round` on an `RR64` or `RR32` exact half goes to the even integer, as on a rational: `round(2.5)` is 2. This is the specification's rule for rationals, IEEE 754's default, and the team's own `round` on rationals.
2. **Applies:** To `round` of `RR64`, `RR32` and rationals, under walk and on the compiled path.
3. **Requires:** Do not round a half away from zero or upward on either path.
4. **Unfinished:** Nothing; it is built.
5. **Could not resolve:** Nothing that blocks. Two minor points of wording: the entry gives no result type for `round`, and it does not say whether the specification's text for floats was changed or already agreed.
