# Record lines: climb batch 14, rung W (`rung-walk-coverage`)

## FACTS

A new entry in "Landed semantics", after F-145:

- **Walk counts an inherited abstract method as defined when the object's bodies of its name at narrower parameter types together cover the abstract parameter types, reading `comprises` clauses as its Meet Rule check does; one narrower body that does not cover is refused** (`compile-ladder/rung-walk-coverage/REPORT.md`, sections 1 and 6; P-147; row 666 closed).
  - How it checks: `Constructor.definedBelow` gathers the bodies of the name and self position at or below the abstract parameter types. A body at those types is the plain case. Otherwise it splits each position through `comprises` clauses (`coverParts`), and asks that every combination of parts lie inside one body's domain. It reads that with `OverloadedFunction.someBelow`, within the Meet Rule check's bounds (`interpreter/evaluator/values/Constructor.java:462-574`).
  - A search that does not settle does not refuse.
  - What it meets: over the interpreter suite, the 62 demos and the specification's examples, every search settles. `Pairs`'s `RunRanges`, the team's `FileConversion` `dna` and the `BirdCount` demos' `SampleEvents` are covered. Nothing that the base loads is refused.
  - Gated by `tests/AbstractMethodPartlyDefinedWalk`, `AbstractMethodNotCoveredWalk` and `AbstractMethodCoveredWalk`.

Rewrite in place, in F-145 (`explorations/coordinator/FACTS.md:137`):
- Its source note: add `compile-ladder/rung-walk-coverage/REPORT.md`.
- Two sentences change. Old: "A check of them would refuse `Random`'s `SeededRandomGenWithDistribution`, which defines no `seedSize` or `reseed` (row 668). A body at narrower parameter types passes (row 666), which `Pairs` and the QuickCheck generators need (row 669)." New: "Bodies at narrower parameter types define the method only where together they cover its parameter types (the entry 'Walk counts an inherited abstract method as defined when ...'); `Random`'s distributed generator and `MersenneTwisterInit` and `QuickCheck`'s `AnyGen` define theirs (rows 668 and 669, fixed)."

## Ledger

- **Row 666.** Close it: `close 666 --commit fb6ce967e --test AbstractMethodPartlyDefinedWalk`. Note: "fixed fb6ce967e (climb batch 14 rung W, P-147). `Constructor.definedBelow` gathers every body of the name and self position at or below the abstract parameter types, and asks that together they cover them, with `comprises` clauses read (`coverParts`; `OverloadedFunction.someBelow`). `XXXAbstractMethodPartlyDefinedWalk` is promoted to `AbstractMethodPartlyDefinedWalk`. Also `AbstractMethodNotCoveredWalk` (refused) and `AbstractMethodCoveredWalk` (covered). Rows 668 and 669 were repaired first."
- **Row 668.** Close it: `close 668 --commit 8673192c2 --test SeededRandomGenAbstractMethods`. Note: "fixed 8673192c2 (climb batch 14 rung W). The proxy's `seedSize` and `reseed` delegate to its generator, and `reseed` returns the proxy itself (`Library/Random.fss:179-182`). `MersenneTwisterInit`'s `perturbed` takes `Generator[\ZZ32\]` (`:345`). That also mends `MersenneTwister`'s `perturbed` for a generator that is not indexed, asserted in the same test (068a183e6)."
- **Row 669.** Close it: `close 669 --commit e26f13335 --test AnyGenPerturbOtherType`. Note: "fixed e26f13335 (climb batch 14 rung W). `AnyGen`'s `perturb` has `Gen`'s default body, `= g` (`Library/QuickCheck.fss:82`; api `QuickCheck.fsi:60`). A generator given a value of another type returns the random number generator as it is."
- **Row 665**, append: "Climb batch 14 rung W: rows 667 and 668 are fixed. So by reading, a check of each instance would no longer meet `IntMap`'s `genComb` or the distributed generator's `seedSize` and `reseed`. The check that such an instance would get now asks for coverage (fb6ce967e). Not measured at instances."
- **Row 670**, append: "Under the coverage rule (fb6ce967e) the three objects are refused as before, each with no body of the method's name. Measured by a logging build over the 62 demos (climb batch 14 rung W, REPORT.md section 6)."

## New rows

None. The rung measured no defect that the record does not hold. One slip was noticed and not measured: the element types of `Random`'s two proxies (REPORT.md section 12). It is left to the curator.

## Handover

Climb batch 14 rung W (`wip/rung-walk-coverage`; c8f43ea7e, 8673192c2, e26f13335, fb6ce967e, 068a183e6, b00f75310):
- Rows 668 and 669 are repaired in the library's way:
  - `Random`'s distributed generator delegates `seedSize` and `reseed`;
  - `MersenneTwisterInit`'s `perturbed` takes `Generator[\ZZ32\]`;
  - `AnyGen`'s `perturb` has `Gen`'s default.
- Walk's abstract-method check asks for coverage, with `comprises` clauses read (P-147). Row 666 is closed, with `XXXAbstractMethodPartlyDefinedWalk` promoted.
- The traits chapter's sentence is revised with a box, and Appendix I's coverage entry is amended.
- `ant testSystem` is green (584). The count stays 1 and the distance 85; no site moved.
- Nothing that the base loads is refused.

## Revival change

**The change.**
- **The team's sources.**
  - The traits chapter of the Working Draft asks that "any object inheriting an abstract method must define a body expression for the method" (`Specification-1.0-frozen/basic/traits.tex:510-512`). To the letter, that is a body at the abstract method's own parameter type.
  - The team's walk made no such check: `checkForDef` returned for every declaration (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:399-404` at `a874948ac`).
  - The team's compiled checker refuses an object unless each inherited abstract method's parameter type is a subtype of the union of those of the concrete methods below it, reading `comprises` clauses (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:96-118`; `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:154-158`).
  - The team's library left three abstract methods uncovered:
    - `Random`'s `SeededRandomGenWithDistribution` had no `seedSize` or `reseed`;
    - `MersenneTwisterInit` defined `perturbed` only at `Indexed[\ZZ32,ZZ32\]`, under the abstract one at `Generator[\ZZ32\]`;
    - `QuickCheck`'s `AnyGen` declared `perturb(obj: Any, g)` abstract, while every generator defines it only at its element type.
- **What the tree now does.**
  - The traits chapter says that the object defines the method by a definition at its parameter type, or by definitions at narrower parameter types that together cover it (`Specification/basic/traits.tex:579-600`).
  - Walk refuses at load an object without static parameters whose narrower bodies do not cover an inherited abstract method. `tests/AbstractMethodPartlyDefinedWalk` and `tests/AbstractMethodNotCoveredWalk` show it.
  - Walk loads an object whose bodies cover the method through a `comprises` clause, as `tests/AbstractMethodCoveredWalk`, `tests/PairsRunRangesWalk` and the team's `tests/FileConversion` show.
  - Where its search through the clauses does not settle, it does not refuse.
  - Each of the three library sites defines its method:
    - the distributed generator delegates `seedSize` and `reseed`, returning itself;
    - `MersenneTwisterInit`'s `perturbed` takes `Generator[\ZZ32\]`;
    - `AnyGen`'s `perturb` returns the generator it is given, as `Gen`'s default does.

    `tests/SeededRandomGenAbstractMethods` and `tests/AnyGenPerturbOtherType` show it.
  - Walk still checks no object with static parameters.
- **The reason.**
  - It is the type group's rule of 2012: the compiled checker above, and Welterweight Fortress's Covered rule. Welterweight says that "the same rules are used to check methods as well as functions", and that the domain of an abstract function "must be a subtype of the union of the domains of the concrete definitions" (`Papers/Welterweight/static.tick:27-47`).
  - The chapter's own sentence on functional methods points to abstract function declarations, which ask that the concrete declarations "together cover" the abstract one's type (`Specification/basic/functions.tex:386-395`, `:431-434`).
  - The team's `Pairs` (`Library/Pairs.fss:78-99`) and `FileConversion` (`ProjectFortress/tests/FileConversion.fss:65-82`) define abstract methods by such covering bodies, and the letter would refuse them.
  - Under the earlier allowance of any one narrower body, a call outside that body stopped walk at run time with "has neither body nor def". This was measured on the base at the three library sites: `seedSize` of a distributed generator, `perturbed` by a filtered range, and `perturb` of a `String` through `genZZ32`.

**Provenance.**
- Item 51, decided as P-147 (coverage defines an inherited abstract method), the curator's answer of 13 October 2026.
- Climb batch 14, rung W. It closes rows 666, 668 and 669.
- It amends the part's entry "An abstract method without a body, and an `override` that overrides nothing, under walk":
  - Its Resolution's allowance, "A declaration with a body of the method's name, whose parameter types are the abstract declaration's or below them, counts as defining the abstract method (ledger row 666). This allowance departs from the chapter ...", gives way to the coverage rule.
  - Its Reason's sentences on `Pairs`, `QuickCheck` and `MersenneTwisterInit` give way to the reason above.
- The skill's `references/interpreter.md`, "What walk checks", needs the same change in its abstract-method bullet, and in "leaves an inherited abstract method without a body at or below its parameter types".
