<!-- Concepts that the FACTS clarity pass's chunk f13 uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f13

The entries name these concepts without a full definition, since other entries use them too. Each belongs in the `fortress-repo` skill, not in the revival part that is being rewritten.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| A clause form with no static argument, and its big operator | F-143, F-144, F-228; also F-141, F-114 | `references/interpreter.md`, beside walk's inference | A reduction (`SUM[j <- 0#4] j`) or a comprehension (`<| k | k <- 0#3 |>`) that writes no `[\T\]`. Walk desugars it to `__bigOperator(BIG OP, clauses)`, and must choose the big operator's static arguments itself (F-228). |
| F-bound, and walk's open type | F-143, F-228; also F-141, F-114 | `references/interpreter.md`, beside walk's inference | A bound that mentions its own parameter, as `T extends Cmp[\T\]`. Under walk, such a parameter that nothing fixes takes the open type, printed `OPEN`, below every type (F-143). A plain bound, as `T extends Number`, is taken as the value instead (F-141). |
| Walk's load check of overloads | F-238; also F-252, F-257, F-258, F-27 | `references/interpreter.md`, "What walk checks" | Already listed by chunk f14's `concepts.md`, with the declaration that has static parameters of its own. |
| A symbolic instantiation | F-238; also F-26 | `references/interpreter.md`, beside walk's load check | The instance of a generic declaration that walk makes with a symbolic type for each static parameter, to check the declaration once for all its instances. |
| Opening a `where`-clause variable | F-?1; also F-251, F-121 | `references/compiler.md`, beside the checker's sizes | A trait whose `comprises` clause lists a type with a `where`-clause variable, as `comprises { N[\n\] } where [\ nat n \]`. At a call, the compiled checker gives that variable a fresh name, so the value's listed type is known with an unknown size or type. |
| A default awaiting the curator's review | F-?1; also F-151 | The short orientation that replaces the revival part | A choice that an agent built where the curator has not ruled. Its review-queue item holds it and the other way. A worker follows the pointer only to see that the choice is not the curator's ruling. |
| Fused reductions and `distribute` | F-248; also F-253 | `references/library.md` | A nested reduction, as the maximum of sums, can run in one pass when the outer reduction distributes over the inner one. The library's `distribute` and `distributes` decide this, and `generate2` then takes its efficient path. |

Concepts that only one entry uses are defined in it: the strict subtype rule of `override` (F-147), the collector of a clause form's elements (F-228).
