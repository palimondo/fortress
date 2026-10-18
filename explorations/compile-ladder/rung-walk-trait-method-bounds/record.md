# Rung W of climb batch 18: the record lines

## For FACTS

New entry, in "Landed semantics", beside F-252:

**Under walk, a pair of declarations that the load check reads on its declared domains and refuses is refused in the name of the rule it breaks.**

- The Return Type Rule: "fails the Return Type Rule: the first [second] is more specific, and its return type is not found to be a subtype of the return type of every instance of the second [first] that applies to its arguments".
- The Meet Rule: "fails the Meet Rule: neither is found to be more specific than the other or to exclude it, and no declaration is found that is more specific than both and applies to every call to which both apply".
- The No Duplicates Rule: walk's "fails because their parameter lists have the same types".
- The code: `ruleFailure`, `interpreter/evaluator/values/OverloadedFunction.java:817-839` at 5c5dee93d; `validOnDeclaredDomains` (`:766`) and `genericPairValid` (`:891`) return a `DomainReading`.
- A pair not read on its declared domains keeps the parameter check's message, "with generic type, at least one pair of parameters must have excluding types" among them: one with a varargs parameter, parameter lists of different lengths, a pair that is neither two own generics nor one own generic beside a plain declaration, or the instances of an explicit instantiation.
- Which pairs load is unchanged.
- The messages say "not found" because walk's reading is narrower than the rules (rows 539, 550, 416, NEW-W-1).
- Gated by `tests/GenericReturnRuleInvariantWalk`, `GenericReturnRuleOuterParamWalk` and `GenericBesidePlainReturnRuleWalk` (Return Type), `GenericOverloadInstancesApartWalk`, `GenericBoundsNoMeetWalk` and `GenericBesidePlainNoMeetWalk` (Meet), and `NoDuplicatesRuleWalk` and `NoDuplicatesRuleSizeWalk` (No Duplicates).
- Detail: `compile-ladder/rung-walk-trait-method-bounds/REPORT.md` sections 1 and 3.

Corrections, each now false in part (REPORT.md section 8):

- F-253: in place of "A method that a trait declares is the exception: its bounds are not read where they are declared, so a type parameter that is a parameter's whole type takes the join of the arguments' run-time types with no argument converted, and a bounded one that nothing fixes takes `BottomType` (row 766, `XXXTraitGenericMethodInference`)", read:
  - "A method that a trait declares reads its bounds, and the types into which its arguments convert, in the trait's method environment, where its instances evaluate their types (`GenericMethod.getTypeEnv`, `interpreter/evaluator/values/GenericMethod.java:106`, read at `EvaluatorBase.java:491`, `:567`, `:646` and `:651` at 5c5dee93d)."
  - "So it takes the instance that the same method declared in an object takes: a `ZZ32` and a `ZZ64` give `Box[\ZZ64\]` with the `ZZ32` converted, and a bounded type parameter that nothing fixes takes its bound (`TraitGenericMethodInference`)."
  - "An inherited generic functional method beside an object's plain one is chosen where only it applies (`InheritedGenericFunctionalMethodBesidePlain`)."
  - Add both tests to the entry's "Gated by".
- F-252: in "otherwise the pair is refused, 'at least one pair of parameters must have excluding types'", the message is now "fails the Return Type Rule".
- F-238: in "otherwise refused, 'with generic type, at least one pair of parameters must have excluding types' (F-155)", the message is now "fails the Meet Rule".
- F-155: "The message is 'at least one pair of parameters must have excluding types' (row 416)" now reads "The message is 'fails the Meet Rule' (row 416)" for `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` (measured; REPORT.md section 3).

## Ledger

Closes, after the landing, by the commit that lands 5c5dee93d's change:

- Row 766: `--test TraitGenericMethodInference`.
- Row 765: `--test InheritedGenericFunctionalMethodBesidePlain`.

Notes, each measured to fit the row's room:

- Row 21 (row 853 characters, notes 533): "Climb batch 18 rung W: row 766's mixed widths at a method that a trait declares now convert (`TraitGenericMethodInference`)." (124 characters)
- Row 772 (row 957, notes 424): "Climb batch 18 rung W: walk gives a trait's method `Box[\RR64\]` here, the `ZZ32` converted (`TraitGenericMethodInference`); of the probe's calls only this one now differs between the paths."

Rows with no room left, so nothing is added; the text is for a rewrite when the gather or a later rung rewrites the row:

- Row 539 (notes 701): "Climb batch 18 rung W: the refusal now says 'fails the Meet Rule' (`XXXOverloadExistentialMeetWalk`)."
- Row 550 (row 1144): "Climb batch 18 rung W: now 'fails the Return Type Rule'."
- Row 740 (row 1161): "Climb batch 18 rung W: now 'fails the Meet Rule'."
- Row 219 (row 1167): "Climb batch 18 rung W: `r07_edge.fss` now 'fails the Meet Rule'."
- Row 416 (row 1179): "The generic form of F-155 now 'fails the Meet Rule'; the plain `Tg` pair keeps 'are unrelated'."
- Row 364 (row 1189): "Climb batch 18 rung W left it as it was (`XXXInferredStaticArgRungS` fails as before)."

New row, in the section "4. Operators and overloading under walk", beside rows 723 and 765 (1,099 characters; claim 299, notes 575):

| NEW-W-1 | under walk, two generic functional methods of a trait or object are refused at load where one lies inside the other: `which[\T extends Shape\](self, x: T)` beside `which[\U extends Round\](self, x: U)`, 'fails the Meet Rule'; the same two top-level functions load, and a call takes the more specific | NEGATIVE-VERIFIED | implementation gap (walk) | `advanced/overloading.tex`, "Declarations with Static Parameters" | `ProjectFortress/tests/XXXGenericFunctionalMethodsNestedWalk.fss` | climb batch 18 rung W | siblings: 723, 724, 765. The same declared in an object, or with `T` unbounded. The two are own generics read by `genericPairValid`, whose `instanceHolding` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2332` at 5c5dee93d) finds neither domain inside the other; not traced further. Before climb batch 18 rung W the message was 'with generic type, at least one pair of parameters must have excluding types'. The compiled path stops at compile with row 724's 'ClassCastException: ... FunctionalMethod cannot be cast to ... Method'. |

## Handover

Climb batch 18 rung W: walk reads a trait's generic method's bounds and coercion targets where the trait declares them, so rows 766 and 765 close. Its load check names the rule that refuses a pair it reads on its declared domains. NEW-W-1, two nested generic functional methods of a trait refused at load, waits for a walk rung.

## Revival change

**The change.**

1. Bounds read where a trait declares its method.
   - The team's source: the team's walk read a generic method's bounds in the environment that holds its declaration (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:85` at `a874948ac`, `new EvalType(appliedThing.getWithin())`). For a method that a trait declares, that is the trait's member environment. Yet the team's walk makes the method's instances in the trait's method environment (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:69` at `a874948ac`), and it keeps the two environments apart (`:92`, "not yet, it changes overloading semantics").
   - What the tree now does: walk reads a trait's generic method's bounds, and the types into which its arguments convert, in the trait's method environment, both at its instances' bounds and in the inference with coercion (`EvaluatorBase.java:491`, `:567`, `:646`, `:651` and `GenericMethod.java:106` at `5c5dee93d`). The unification that follows a failed inference keeps the team's read (`EvaluatorBase.java:886`). So `Maker.wrap(z, w)`, with `wrap[\T\](a: T, b: T): Box[\T\]` declared in a trait, gives `Box[\ZZ64\]` on a `ZZ32` and a `ZZ64`, with the `ZZ32` converted. `Maker.make()`, with `make[\T extends Number\]()`, gives `Empty[\Number\]`. An inherited generic functional method beside an object's plain one is chosen where only it applies. Tests: `ProjectFortress/tests/TraitGenericMethodInference.fss` and `InheritedGenericFunctionalMethodBesidePlain.fss`.
   - The reason: on the code before, the same calls gave `Box[\AnyIntegral\]` with the `ZZ32` unconverted, and `Empty[\BOTTOM\]` (measured: "FAIL: J5/0:other =/= J9/0:Box[ZZ64]"). The coercion lookup in the member environment throws "This should have been an environment with a Top Level" (`ProjectFortress/src/com/sun/fortress/interpreter/env/BetterEnv.java:339`). This went against the specification's narrowest type into which every argument converts, and its rule that inference never instantiates a static parameter at `BottomType` (`Specification/basic/inference.tex:81-106`). The same method declared in an object already gave both of the specification's answers.

2. The refusal names the rule.
   - The team's source: the team's walk refused a pair of declarations with static parameters, whose parameter check met a type parameter neither excluding nor ordered, with "with generic type, at least one pair of parameters must have excluding types" (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:527` at `a874948ac`).
   - What the tree now does: walk reads such a pair on its declared domains by the specification's three rules, and where it refuses the pair it names the rule: "fails the Return Type Rule: ...", "fails the Meet Rule: ...", and for the No Duplicates Rule the team's own "fails because their parameter lists have the same types" (`OverloadedFunction.java:817-839` at `5c5dee93d`). Tests: `ProjectFortress/tests/GenericReturnRuleInvariantWalk`, `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk` and five more, each with its `.test` key. The old message stays for a pair that is not read so, such as one with a varargs parameter.
   - The reason: the specification requires no pair of parameters to exclude. It states the No Duplicates, Meet and Return Type Rules by name (`Specification/advanced/overloading.tex:531-564`), and it allows `ident[\T extends Shape\](x: T): T` beside `ident[\T extends Round\](x: T): T`, no parameter pair of which excludes (`:608-615`), a pair that walk loads.

**Provenance.**

- The first change follows P-46, P-48 and P-74 (row 766 against all three, the climb batch 17 landing review's finding 1). It takes PLAN item 60's default, way A of the row 766 probe (`explorations/perf-probes/trait-generic-method-inference/REPORT.md`, `way-a.patch`), with the record's call 1, which keeps `inferByUnification` as it is.
- The second follows P-45 and the landing review's finding 3, with the record's call 2, which keeps the No Duplicates Rule's message and gives each of the other two rules its own.
- Both were made in climb batch 18, rung W.
- Sentences this makes false, for the writer and the gather:
  - FACTS F-253's exception sentence.
  - The message as F-155, F-238 and F-252 give it ("at least one pair of parameters must have excluding types"; now "fails the Meet Rule" for F-155's and F-238's pairs, and "fails the Return Type Rule" for F-252's).
  - The skill's `references/revival-changes.md:148`, its last sentence: "A generic method that a trait declares is still instantiated without coercion and without its bound (ledger row 766)." It should go, and the resolution of "Walk's check of two generic declarations" (`:46`) may gain the three messages.
  - The notes of ledger rows 219, 539, 550 and 740, which quote the old message.