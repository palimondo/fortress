# Cold read, chunk c3 (P-41 to P-50)

Read only `rewritten-c3.txt`. A note for all entries: "he" (P-41, P-43, P-46, P-48) never has an antecedent. I took it to mean the curator, but the entries never say so.

## P-41: a size at run time travels as a type argument's descriptor (design B)

1. Do: at run time, pass a size in the descriptor slot the team's code generator reserved for type arguments. Give each number one descriptor, taken from a table, with no holder class. Keep operator static arguments as compile-time names, and do not try to unify them with sizes.
2. Decides: sizes go through the type-argument descriptor path. Why: the code generator already reserved the slot, and it matches how the team instantiates types.
3. Unclear:
   - "Each number has one descriptor" can be read two ways: one descriptor per numeric value (3, 4, ...) or one per number type.
   - "as the team instantiates types" may attach only to "from a table, with no holder class", or to the whole sentence.
   - In "he sees no need to unify them", "them" probably means operator static arguments and sizes. It could also mean the two kinds of descriptor.
   - The entry does not say what "a size" covers: a nat static parameter, an array bound, or both.

## P-42: an unbounded type parameter's implicit bound is `Any`, not `Object`

1. Do: treat an unbounded type parameter as bounded by `Any`. The specification states this bound, with a callout that records the Working Draft's `Object`. The compile path keeps `Object` until the switch-over (row 412).
2. Decides: the bound is `Any`. Why: `Any` holds tuples, functions and `()`, `Object` does not, and the library instantiates its generic containers at tuples.
3. Unclear:
   - "arrays indexed by pairs among them" can be read two ways. Either such arrays are among the containers instantiated at tuples, or they are a separate case.
   - "a callout that keeps the Working Draft's `Object`" may mean the old text is kept as history, or that it is still binding somewhere.
   - In "departs from it", "it" could be the specification or this decision.
   - The entry does not say whether a worker on the compile path should fix `Object` now or must leave it until the switch-over.

## P-43: the exclusion rule stays, and the number tower is flat (route A)

1. Do: keep the multiple instantiation exclusion rule in the compiled checker. Keep the library's numbers flat: the fixed widths, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each with its own algebra. Give `Number` no catch-all operators.
2. Decides: route A (rule kept, flat tower). Why: it is the shape the compiler prelude took for performance, so every type keeps its own specialised body.
3. Unclear:
   - "So the library's numbers are flat" reads as though keeping the rule forces a flat tower. The entry does not show that link.
   - "He cares that specialised code runs fast, not how a specialisation is chosen" sits awkwardly next to a decision about how specialisation is structured. It could be read as making route A negotiable.
   - "F-46 prices a return to route C": it is unclear whether route C is still open for consideration or closed.
   - Tension with P-46: `Number` has no catch-all operators, yet P-46's example is a generic arm over `T extends Number`. It is not clear what such an arm can compute.

## P-44: `AnyIntegral`'s closure stands; the checker reads `comprises` the 2012 way

1. Do: keep `AnyIntegral comprises { ... }` with a `NOT YET` comment in the team's wording. Let the checker accept a generic child of a closed trait when every type the checker knows below it is listed. Leave the clause's text and walk unchanged.
2. Decides: the closure stays, with the 2012 reading of `comprises`. Why: not stated. The only reason given is that every reading except the 2008 one has the same hole (row 487).
3. Unclear:
   - In "every type that the checker knows below it", "it" may be the generic child or the closed trait.
   - "The clause's text" may mean the specification's `comprises` clause or the `AnyIntegral` declaration.
   - The entry does not define "the 2012 way" or say how it differs from the 2008 reading.
   - The hole (a program's own `Integral` subtype in another component is not caught) is recorded, but the entry does not say whether it is accepted or must be fixed.

## P-45: overloads may differ in their static parameters (answer 9)

1. Do: in the specification, drop the sentence that forbids this, state the type group's 2011 model, and keep the old sentence marked superseded. In the checker:
   - keep the three overloading rules;
   - check the Return Type Rule over every instance;
   - require two generic declarations in the more-specific relation to agree on their static parameters position by position.

   Walk dispatches on declared domains, not on the order of declarations. Walk's load check uses the checker's rules, with no parameter pair required to exclude. Fix the library's refused families with exclusions.
2. Decides: the 2011 model, which allows such overloads. Why: so that walk and the checker accept the same pairs (row 159).
3. Unclear:
   - The headline seems to conflict with the agreement rule: overloads "may differ in their static parameters", but declarations related by specificity must "agree on their static parameters". Presumably only unrelated overloads may differ, but the entry does not say so.
   - "as Java's overriding rule does" cites an overriding rule for an overloading question.
   - "no model line changes" may mean microGPT's model code, or the lines of the 2011 type model.
   - "with no parameter pair required to exclude" is hard to parse: which pair, and exclude what?
   - "the pairs that walk or the checker still reads otherwise": otherwise than what? Probably otherwise than this rule.

## P-46: a conversion makes a call possible, and never changes which declaration runs when one already fits

1. Do: choose a declaration on declared domains, by applicability and then specificity. Instantiate the chosen one by answer 8's promotion (P-74), with its coercions inserted statically. Do not adopt the broader rule ("apply any conversion that reaches a specific declaration, and fall back to a plain one only when none does").
2. Decides: conversion affects how the chosen declaration is instantiated, never which one is chosen. Why: fast generic code that a JVM can specialise.
3. Unclear:
   - The example seems to contradict the headline. For a mixed-width call, the plain arm over `Any` already fits without any conversion. Yet the generic arm over `T extends Number` runs, at `ZZ64`, which needs promotion. That looks like what the rejected broader rule would do. It reconciles only if the generic arm counts as applicable on its declared domain before any promotion, and the entry does not spell that out.
   - "Both paths" is not identified. It could mean walk and compiled code, or the checker and the run time.
   - Tension with P-43: an arm over `T extends Number` when `Number` has no catch-all operators.
   - Tension with P-48, which rules out "the arguments' union" as an instance. Promoting mixed widths to `ZZ64` reads like a union or join of the arguments, unless the arguments count as "fixing" `T` here.

## P-47: each integer type declares its own `MIN`, `MAX` and `MINMAX`

1. Do: put `MIN`, `MAX` and `MINMAX` in every integer type itself, presumably rather than inheriting them from a shared trait.
2. Decides: one declaration per type. Why: it matches `QQ`, `RR64`, the compiler library and the specification's `ZZ`, so that under walk the family answers at the promoted type.
3. Unclear:
   - "the family answers at the promoted type": "the family" may mean the integer types or the `MIN`/`MAX`/`MINMAX` group. "Answers at" probably means the result has the promoted type, but it could be read other ways.
   - The specification's `ZZ` is cited for `MIN` and `MAX` only. It is unclear whether `ZZ` also gets `MINMAX`, and whether "each integer type" includes `ZZ`, which has no fixed width.
   - Not inheriting from a shared trait is implied but never stated.

## P-48: a type parameter that a call's arguments do not fix takes its bound, never `Bottom`

1. Do: instantiate such a parameter at the intersection of its upper bounds, constrained by the call's static return type. Never use `Bottom`, the arguments' union, or the value's type alone. Keep the library's unbounded declarations. Walk still takes the value's type where dispatch reaches a declaration.
2. Decides: unfixed parameters take their bound. Why: it is the team's later word (POPL 2019), which he ranks above his own reading.
3. Unclear:
   - "do not fix" could mean "do not mention" or "do not determine uniquely". Only the second reading makes "never the arguments' union" relevant.
   - The entry does not say how "intersection of upper bounds" and "constrained by the static return type" combine (a meet, or a check).
   - "never ... the value's type alone" conflicts with walk taking the value's type. It is unclear whether that is an accepted deviation or a gap to close.
   - P-42 makes the bound of an unbounded parameter `Any`, but the compile path still uses `Object`. Which bound the compile path should apply here is not said.

## P-49: the checker tries a call without the expected type first, and with coercion only after (row 508)

1. Do: first check the call by subtyping without the expected type. Keep that result if it converts to the expected type. Only otherwise, retry with coercion and the context.
2. Decides: subtyping without context first, coercion with context second. Why: a declaration that fits the arguments as they are must not be passed over for one reached by coercion.
3. Unclear:
   - "It keeps the first attempt ... when its result converts to the expected type, and only then tries coercion": read literally, "only then" means coercion is tried after the first attempt is kept. The intent is probably "otherwise".
   - "converts" may mean by subtyping or by coercion.
   - "the context" is presumably the expected type, but the entry does not say so.

## P-50: a `label` body takes the expected type of the whole `label` (item 48 (a))

1. Do: in the checker, pass the expected type of the whole `label` into its body and into its exits' `with` values, as for a `typecase` clause. Have the inference chapter list both contexts.
2. Decides: both parts of a `label` are checked against its expected type. Why: the specification types a `label` as the union of the body's last expression and the exits' `with` values.
3. Unclear:
   - "the inference chapter lists both contexts" may be an instruction to edit the chapter or a statement that it already does.
   - The entry defers to P-51 for "the other half" without saying what that half covers.
