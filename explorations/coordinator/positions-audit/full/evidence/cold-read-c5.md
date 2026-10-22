# Cold read, chunk c5

Source: `explorations/coordinator/positions-audit/full/evidence/rewritten-c5.txt` (10 entries). I read only that file.

## P-146: `self` in a self-typed trait's bodies

1. **What it tells me to do.** In the checker, inside the method bodies of a trait `C[\X\]` whose `X extends C[\X\]`, type `self` as `C[\X\] & X`, and leave the signatures at `C[\X\]`. Refuse a type that extends such a trait with `X` set to some other type. Do not add self types or `comprises` clauses to the library, and do not change walk. `Integral`'s `numerator` is the exception: each integer type declares it.
2. **What it decides, and why.** It decides how the checker types `self` in F-bounded traits, so that the library type-checks as the team wrote it, using a rule the peer languages share.
3. **What is unclear.**
   - "the signatures keep the plain trait type": I can read this two ways. Either `self`, where it appears in a signature, is typed `C[\X\]`, or the signatures are simply not rewritten at all.
   - "extends such a trait at another type": does this cover a generic subtrait that passes its own parameter through (`trait D[\X\] extends C[\X\]`, where `X extends D[\X\]`)? Or only a concrete type that names a type other than itself?
   - The refusal is the checker's, and "walk is unchanged", so walk keeps accepting what the checker refuses. P-147, P-152 and P-67 to P-70 aim for the two paths to agree, and this entry does not say whether the gap here is intended.
   - Having each integer type declare `numerator` is itself a change to the library's text, though the entry also says the library gains nothing. The entry gives no status (built or still to build) for either the checker rule or the `numerator` change.
   - The entry relies on Scala's rule and on "the peers", but P-149 says other languages are consulted only to settle a conflict between earlier and later designers. This entry names no such conflict.

## P-147: narrower bodies that together define an inherited abstract method

1. **What it tells me to do.** Treat an object as defining an inherited abstract method when its bodies of that name, at narrower parameter types, together cover the abstract method's parameter types. Read `comprises` clauses the way the checker does. Remove walk's acceptance of a single narrower body, and revise the traits chapter's sentence in the S1 form.
2. **What it decides, and why.** It decides when an abstract method counts as implemented by overloads: the team's 2012 coverage rule (Steele's checker, Welterweight's Covered rule), which keeps `Pairs` and `FileConversion` valid.
3. **What is unclear.**
   - "its bodies": only the bodies the object declares, or also bodies it inherits? If inherited bodies count, the rule collides with P-149, which refuses an object whose body comes from a sibling trait. The mixed case is not covered either: some covering bodies declared and others inherited.
   - With several parameters, is coverage judged over the whole tuple of parameter types, or one parameter at a time?
   - "the checker": Steele's 2012 compiled checker, or the revival's current one? I need to know which to consult for how `comprises` clauses are read (an open `comprises`, for instance).
   - Status is missing. "walk agrees with the checker" and "the traits chapter's sentence is revised" could describe work already done or work still to do.
   - "any one narrower body": it reads as "a single body, whether or not it covers", but it could also be read as "every narrower body".

## P-149: an abstract method in one trait, its body in a sibling

1. **What it tells me to do.** Refuse `object O extends { A, B }` when `A` declares a functional method abstract, `B` gives it a body, and `O` declares none of its own: `O` must declare the method itself. Also refuse a trait that declares the same method both abstract and concrete. Do not borrow other languages' rules unless earlier and later designers conflict.
2. **What it decides, and why.** It decides that a sibling's body does not satisfy an abstract functional method, because the specification and Welterweight say so (walk already refuses it) and convenience is no reason to change Fortress.
3. **What is unclear.**
   - "one method" in the trait clause: the same name, or the same name and the same parameter types? If it means the same name, an abstract method at a wide type plus a concrete one at a narrow type in one trait would be refused. That seems at odds with P-147's coverage rule.
   - The rule is stated for functional methods only. Does a dotted method, abstract in `A` with a body in `B`, count as defined? The wording invites the guess that it does, but nothing says so.
   - Does it matter whether `B`'s body has exactly `A`'s parameter types or narrower ones that cover them (the P-147 case)?
   - The entry says walk already refuses this, but not whether the checker does yet: no status.
   - The general principle in the "Why" clause seems to contradict P-146's and P-69's appeals to Scala and to "every peer language".

## P-152: exclusion between generic declarations, over the whole parameter type

1. **What it tells me to do.** When checking overloads between generic declarations, decide exclusion over the whole parameter type (existential reduction), not one parameter at a time, in both walk and the compiled checker. A pair that excludes only because a shared static parameter would have to take two values is valid wherever the overloading rules then hold. Still open: pairs where one declaration has a `where` clause (row 787), and object types over a static parameter (row 788).
2. **What it decides, and why.** It decides that both paths read exclusion as the specification and the type group's 2011 paper do, closing rows 740 and 741.
3. **What is unclear.**
   - "exclude each other only together, through a shared parameter that fixes one static argument" is hard to parse without an example. I take "shared parameter" to mean a static parameter that occurs in several positions (as in `f[\T\](T, T)` against `f(ZZ32, String)`), but it could also mean a value parameter.
   - "valid where the declared domains meet the overloading rules": is "where" a condition ("if") or a place? And which overloading rules are meant?
   - "walk loads the program that it refused after climb batch 16": did walk start refusing the program after batch 16, or will it load the program after batch 16? The phrase can attach to either verb. The entry also does not say which program.
   - "Walk and the compiled checker both change": done or still to do? Only rows 787 and 788 are listed as still to build, which suggests the main change is in, but the present tense leaves it open.

## P-154: lists compare only totally ordered elements

1. **What it tells me to do.** On the checker, give a list `<` only when its element type is totally ordered, so a list of floats or of `QQ` has no `<`. Do not add a lexicographic trait for partially ordered elements. Still to do: walk's half (row 774), and revision notes at the two specification sentences that say every list is ordered.
2. **What it decides, and why.** It decides that lists order lexicographically only over total orders, because the team's later library bounds both lexicographic traits that way and the case affects neither the distance nor microGPT.
3. **What is unclear.**
   - "while a pair of floats is ordered" sits oddly against the rest. Why may a pair of floats be ordered when a list of floats may not? Ordered how: lexicographically, componentwise, partially, totally? If a pair is lexicographic over partially ordered floats, that seems to contradict the refusal to add a lexicographic trait for partially ordered elements.
   - The entry does not say why `QQ` counts as not totally ordered.
   - "both lexicographic traits" are not named.
   - "conditional extension is a `where` form the team wrote (P-151)": is this the mechanism to use (lists extend the trait only where the element is totally ordered), or only a supporting argument?
   - "is added now" implies the trait might be added later. The entry does not say when or why.
   - "a revision note" on these two sentences, against P-147's "revised in the S1 form": do I annotate the specification here, or rewrite it?

## P-155: overloading checks for symbolic operators before the switch-over

1. **What it tells me to do.** Make the compiled checker's overloading check cover `+`, `^`, `||`, subscripts and every other symbolic operator, by the same rules as any function, so that the switch-over's zero count is real. Every design question this raises goes to the decision-maker, with the probe's measurement, before its rung is built. The check and its rungs are not built yet (row 584; PLAN items 38 and 59).
2. **What it decides, and why.** It decides to end the operator skip before the switch-over, because the skip is a known gap rather than a rule, and an unchecked zero hides errors.
3. **What is unclear.**
   - "brought to him": "him" has no antecedent in the entry. I assume the curator, but the entry never says so.
   - Are the two examples (a subscript index bound that keeps ranges out; vector plus number beside vector plus vector) designs already chosen, or only examples of questions still to bring? I read them as still open.
   - "beside": does it mean the two `+` overloads must coexist, or does it list two separate design questions?
   - "the probe's measurement": one probe report is cited for every design. Does each design need its own measurement?

## P-67: `round` on an exact half

1. **What it tells me to do.** Round an exact half to the even integer, on walk and on compiled code.
2. **What it decides, and why.** It decides ties-to-even, because the specification uses it for rationals, it is IEEE's default, and it matches the team's own rational code.
3. **What is unclear.**
   - Which types does it cover? I infer floats and rationals from the reasons given, but the entry does not list them.

## P-68: `floor` and `ceiling` against the bracket forms

1. **What it tells me to do.** `floor` and `ceiling` on float types return a float. The bracket forms ⌊x⌋ and ⌈x⌉, and `round` and `truncate`, return unbounded ℤ. Tidy the library's `truncate` and `round` to match. A library rung after the switch-over is still to come (row 330); it starts by counting the interpreter tests whose output changes.
2. **What it decides, and why.** It decides the result types of the rounding family. The entry gives no reason.
3. **What is unclear.**
   - The named `floor` and the bracket ⌊x⌋ now return different types. A reader could easily take them as one operation, so the split deserves a sentence confirming it is intended.
   - Does "on the float types" also limit the second clause? What do ⌊x⌋ and `round` return on `QQ` or on fixed-width integers?
   - Is the tidying of `truncate` and `round` done, or is it the rung still to build?
   - What does the test count decide? Does a large count stop or change the rung?
   - Unlike P-67, P-69 and P-70, it does not say "on both paths".

## P-69: `LSHIFT`, `RSHIFT` and `shift`

1. **What it tells me to do.** `LSHIFT` and `RSHIFT` are fixed-width bit shifts. A count at or beyond the width gives 0 or the sign, a negative count shifts the other way, shifted-out bits are dropped without error, and the count may be of any integral width. `shift` on ℤ is exact. Compiled code shifts the machine word directly, never through ℤ.
2. **What it decides, and why.** It decides shift semantics, following peer languages for the dropped bits.
3. **What is unclear.**
   - "gives 0 or the sign": which operation gives which? My guess is that a left shift gives 0 and a signed right shift fills with the sign (0 or −1). "The sign" could also mean the sign bit.
   - "exact on ℤ": for a right shift, does "exact" mean floor division, or something else? Does a negative count reverse for `shift` too?
   - Status contradicts itself. "Built on both paths, but for the compiled `NN32` and `NN64`" names only those two types as missing. The next clause says the compiled path still has to get "`shift` and the any-width count" at the switch-over, so those are missing on the compiled path as well.

## P-70: `GCD` and `LCM`

1. **What it tells me to do.** `GCD` and `LCM` return nonnegative results on both paths, and `LCM` raises an overflow error when the result does not fit. This is built, except for compiled `NN32` and `NN64`, which get both operators at the switch-over (row 442).
2. **What it decides, and why.** It decides the sign of the results and the overflow behavior, because the specification says so.
3. **What is unclear.**
   - What should `GCD` do when its nonnegative result does not fit, for instance `GCD(minimum ZZ32, 0)` = 2^31? Only `LCM` is said to raise.
   - "does not fit": fit in the operand's fixed width, I assume. On ℤ this never happens.
   - The entry does not name the overflow error.
