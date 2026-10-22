<!-- The orientation workflow's disposition table for the consolidation of 2026-10-22: where each entry of the old revival part goes, with the place checked. A review artifact, not a registry. -->

# Disposition of the old revival part

Old part: `.claude/skills/fortress-repo/references/revival-changes.md` at `cc1da1cda` (last changed at `df58b05b8`), 54 entries under bold headings. Rules D1 to L2 are those of `outline.md` in this folder.

Destinations:
- **Rule**: the entry is the main source of a rule of the outline.
- **Merged**: the entry joins a rule whose main source is another entry.
- **Area part**: the current rule is already in the core or an area part; the orientation does not repeat it.
- **History**: the entry's change does not alter what a worker does, so it leaves the skill. Its provenance stays in `sources.md` (lines given), and its current fact in the FACTS or POSITIONS entry named.
- **FACTS pass**: the fact is only in the skill; it goes to the normal FACTS pass.
- **Discrepancy**: two texts disagree; to settle at the install (`outline.md`, "Discrepancies").

For every entry, the Original and Reason bullets leave the orientation. Their provenance is in the `sources.md` lines named; the specification's original text stays in Appendix I; the reasons of the curator's decisions are in the POSITIONS entries named. "Moves to" marks detail that the install puts into an area part that does not hold it yet; "checked" names the place read on this base.

| # | Old entry (line) | Destination | Place checked, and detail that moves | `sources.md`; current home |
|---|---|---|---|---|
| 1 | Overloads that differ in static parameters (19) | Rule D1 | — | 415, 606; P-45, F-174, F-50 |
| 2 | The return-type rule (25) | Merged into D1 (every instance) | — | 416; F-75; row 536 |
| 3 | Two functional methods with equivalent parameter types (31) | Rule D5 | The checker's message text: history | 654; F-223 |
| 4 | Walk's choice between a generic and a plain declaration (37) | Rule D3 | — | 417; F-26 |
| 5 | Walk's check of two generic declarations (43) | Rule D4; its declared domain and three rules into D1 | Checked: `interpreter.md:38` states the rules on declared domains and points back to this entry for the cases, which it does not hold. Moves to `interpreter.md`, "What walk checks": the three refusal messages, the four cases that keep the team's rule (varargs, lengths, other pairs, an explicit instantiation), the eight departures with rows 539, 416, 786, 412, 759, 779, 780, 788, 787 | 681, 698, 709, 710, 720, 738, 746; F-27, F-252, F-257, F-274, F-275, F-238 |
| 6 | Exclusion where a declaration has static parameters (68) | Rule D2 | Checked: neither area part states the limits. Moves: walk's four limits (the free parameter's pair, the forced instance with a static parameter, the parameter check's object types, no `where` clause read) to `interpreter.md`, "What walk checks"; the checker reads no bounds here (row 786) to `compiler.md` | 737, 747, 752; P-152, F-258; rows 786, 787, 788 |
| 7 | `fill` and `tabulate` (79) | Area part | Checked: `library.md`, "The curator's decisions on the library", last bullet | 389, 414, 418; P-89 |
| 8 | The exclusion rule (87) | Rule T1 | The core's traits bullet states the rule; T1 adds the paths | 236, 419, 424; F-44, P-43, P-97 |
| 9 | What a `comprises` clause says (93) | Rule T2 | — | 420 (as "`comprises`"); P-60, P-44, F-175 |
| 10 | A trait's `override`, and object expressions, under walk (99) | Merged into T3 (a trait's `override` holds below it) | Checked: `interpreter.md`, "What walk checks", checks object expressions and names "a symbolic type" without a definition. Moves to `interpreter.md`: walk lifts each object expression to the top level; the stand-in (`symbolicInstance`), one type for all instances of a generic type; no stand-in for an `opr` static parameter. The checker's acceptance of an object expression that breaks the rule stays with row 570 | 430, 436; F-142, F-145; row 570 |
| 11 | An abstract method without a body, and an `override` that overrides nothing, under walk (105) | Rule T4 (the abstract half); merged into T3 (the `override` half) | Checked: `interpreter.md`, "What walk checks", holds walk's limits (10,000 steps, 4,096 combinations, a static parameter's body with row 728, the two cases of unread bounds). The checker's split limit (row 725) goes into T4. `Random` and `QuickCheck` defining their methods: history | 436, 440; F-145, F-147, P-147; rows 653, 665, 693, 725, 728 |
| 12 | What a type provides (111) | Rule T3 | — | 431; F-88; `ProjectFortress/tests/disp0.fss` |
| 13 | Abstract functional methods in the checker's overloading check (117) | Merged into D5 | The three messages, the top-level check's skip of an implemented abstract method, and "object" in the message: history, with F-80 and F-223 | 680, 702, 721; F-80, F-223, P-149 |
| 14 | A string's `left` and `right` (126) | History | The default, a `Maybe` as declared, is the tree's rule, so no worker acts differently | 433; P-53, F-90 |
| 15 | An object or trait declared `extends Any` (132) | History | The default, `extends Any` as no clause, is the tree's rule | 739, 748; F-259 |
| 16 | A string's `\|\|` with a value of any type (138) | History | A narrow library behaviour (a function or a tuple of seven or more beside a string raises `CastError`) | 740, 749; F-259 |
| 17 | `self` in a self-typed trait (144) | Rule T5 | — | 639, 642; P-146, F-225 |
| 18 | `SYMDIFF` of a many-entry and a one-entry `IntMap` (154) | FACTS pass; history | Checked: no FACTS or POSITIONS entry names `SYMDIFF` (grep); ledger row 671 holds the repair | 635 |
| 19 | `UPLUS` of `IntMap`s on a shared key (160) | History | — | 653; F-230 |
| 20 | The bound of a type parameter that has none written (168) | Area part; L1 points to the compiled half | Checked: `SKILL.md:132` ("bounded by `Any`, which holds tuples"); `compiler.md`, "Traps of the compiled path", first bullet (`Object`, row 412) | 421 (as "The bound `Any`"); P-42 |
| 21 | A type parameter that a call does not fix (174) | Rule S1 | The core states the rule and points to "Static parameters" for walk's `Bottom` cases (rows 591, 612, 587), which S1 keeps | 422, 504, 540, 650; P-48, F-78, F-141 |
| 22 | A generic method's static arguments, under walk (183) | Merged into D3 | — | 699, 711, 722; F-253 |
| 23 | A call written as an argument (189) | Rule S2 | — | 636; P-51, F-221; row 705 |
| 24 | A type parameter whose bound names itself, under walk (195) | Merged into S1 (`OPEN`) and R1 (a reduction's instance) | The core states "stays open, and every value passes it" | 430, 434, 649; F-143 |
| 25 | A reduction or a comprehension without static arguments, under walk (201) | Rule R1 | The code names `bigOperatorByElements` and `resultArgOf`, and the reading of a big operator's own result trait: history, with F-228 | 649, 671, 683; F-228, P-48; rows 716, 20, 717, 731 |
| 26 | A type parameter with two bounds, one a closed trait, in the checker (216) | History | A checker rule for a rare bound. Checked: `compiler.md` does not state it; F-227 does, and rows 712 and 713 hold the two cases that still fail | 648; F-227 |
| 27 | A `where` clause's constraint, in the checker (224) | Merged into S3 | Checked: `compiler.md` names `where` clauses only for the code generator. Moves to `compiler.md`: where the checker checks a constraint (a call, a dotted call, a type's use, a constructor call), the `where`-clause variable inferred at a call, and the two unchecked cases (a bound that names the method's own parameters or a variable; a written static argument against its bound, row 470) | 700, 712, 723; F-250, F-256; rows 470, 777 |
| 28 | Conditional extension (239) | Rule S3 (its definition and paths); the list's order into T6 | Checked: `compiler.md`, "What the compiled path cannot compile yet", says the code generator compiles a conditional `extends`. Moves to `compiler.md`: the parts of a declaration that the condition does not cover while the checker checks them, and row 773. `LexicographicOrder`'s bound and `ZeroIndexed`'s place: history | 713, 724; F-255, P-151, P-154; rows 773, 774 |
| 29 | Sizes on the compiled path (253) | Merged into S4 | Checked: `SKILL.md`, "The compiled run time" (a size as a descriptor from `RTTIsize.of`) | 423 (as "Sizes"); P-40, P-41, F-129 |
| 30 | Arithmetic in a size (259) | Rule S4 | — | 439, 572, 637, 702; P-55, F-176, F-222; row 675 |
| 31 | A size known only at run time (265) | Merged into S4 | Checked: `compiler.md` does not name `NatParam`. Moves to `compiler.md`: the checker's opening of a size (fresh, equal only to itself, reaching no type that names another size) | 569; F-270; `compiler_tests/XXXNatOpenRun.fss` |
| 32 | A type `where`-clause variable in a `comprises` clause (271) | Merged into S3 | Checked: neither area part names it; `compiler.md` holds row 701's refusal. Moves: the checker's opening, its scope (not in `extends` and `excludes`; not for a supertype) and rows 751, 752, 755, 756 to `compiler.md`; walk's rows 754 and 778 to `interpreter.md`. `AnyList`'s `addLeft` and `addRight` bodies: history | 701, 712, 714, 725; F-251 |
| 33 | Comparing pairs and triples (282) | Rule T6 | `Reflect`'s `members` as a list in declaration order: FACTS pass and history. Checked: no FACTS entry names it (grep) | 437, 571, 590; F-92; row 511 |
| 34 | Tower or siblings (290) | Rule N1 (the route names and "the tower") | Checked: `SKILL.md`, "Numbers are siblings, not a tower", states the siblings | 424; P-43, F-131 |
| 35 | Conversion under walk (296) | Rule N3 | Checked: `interpreter.md`, "How walk evaluates a program", states the choice by value and its two tests | 425; F-128, P-59 |
| 36 | Mixed number types in a generic call (302) | Merged into N3 | — | 426, 570; P-74, P-46, F-55, F-73; row 511 |
| 37 | Overflow (308) | Area part | Checked: `SKILL.md`, "Numbers are siblings" ("Overflow raises `IntegerOverflow`"); `library.md`, the wrapping operators | 230, 427; P-73, F-132 |
| 38 | An integer power (314) | Rule N4; `IntLiteral`'s power (row 578) into N2 | Checked: `library.md` does not name `fail`. Moves to `library.md`, "Designing a change": a `fail` without a static argument has the result type `Any`; where it must have a type, write it, as `fail[\ZZ32\]` (synthesis, "Example of the boundary"). The tests and demos rewritten, the api's two powers, `strToInt`: history | 758, 766; P-153, F-263; rows 441, 523, 578 |
| 39 | The rational power over any integer (322) | Merged into N4 | — | 759, 767; F-263 |
| 40 | Ranges (328) | Area part | Checked: `library.md`, "The curator's decisions on the library", first bullet | 428; P-77, F-133 |
| 41 | Bounded ranges of rank 2 and 3 (334) | History | — | 432, 435; F-89 |
| 42 | Checking a range of rank 2 or 3 against bounds (340) | History | The default, bounds checked on every axis, is the tree's rule | 435, 591; P-52, F-91 |
| 43 | The trivial open range `(:)` (346) | History | — | 582, 592; P-56, F-91 |
| 44 | `SUM` and `PROD` (352) | Merged into R1; Discrepancy U1 | Checked: `library.md`, the `SUM` bullet, holds the generic declaration, rows 716 and 436; its condition "if the generators and the body do not fix the element type" disagrees with F-59 | 230, 429, 651, 658, 700, 726; P-78, F-59; rows 436, 716, 731 |
| 45 | Vectors and matrices at an element type that is not a number type (358) | Rule N2 | — | 652; F-229; row 721 |
| 46 | The result types of vectors and matrices, and the api's array declarations (364) | History | The `replica` consequence (`CastError`) is in F-264 | 760, 768; F-264, F-90, F-35 |
| 47 | Rounding a rational at an infinity or 0/0 (377) | History | — | 593; P-54, F-90 |
| 48 | The lifted type of a reduction without an identity (385) | Rule R2 | — | 434, 436, 555, 650; F-144 |
| 49 | A generator's size, the relational predicate and the default index-value pairs (391) | History | — | 438; F-93 |
| 50 | Walk's `if` on a value that is not a `Boolean` (397) | Rule L1 (the `if` clause) | — | 682; F-239 |
| 51 | The fusion of `SUM` with `MAX` and `MIN` (403) | History | The library's internals | 700, 727; F-248, F-242, P-151 |
| 52 | `embiggen`, and the maps' `BIG UNION` and `BIG UPLUS` (409) | History | — | 700, 728; F-250, F-85 |
| 53 | A function whose return type is left out, in a component (417) | Merged into L2 | — | 702, 729; F-254 |
| 54 | A parameter whose type is left out (423) | Rule L2 | — | 431 (as "a parameter whose type is left out"); F-266; row 405 |

## The opening and the headings

| Old text (lines) | Destination |
|---|---|
| The three forms of Fortress, the two reasons, the headings as the points of `SKILL.md` (3-9) | Reading contract, item 1. The two reasons and the heading rule go: the orientation is organised by concepts, and no landing needs an entry (synthesis, "A small change to the existing process"). `sources.md` 412-413 |
| Each resolution is the rule of this tree; Appendix I; the Working Draft; the type group (11) | Reading contract, items 3 and 4. `sources.md` 606 |
| Search for the construct's name; the nearest heading (13) | Replaced by the whole read (synthesis, "Addendum"); reading contract, item 5, sends a reader to the record for a change that is not here |
| Old notes right about the team's walk, the three examples (15) | Reading contract, item 6 |
| The section headings | 1. Dispatch and overloading; 2. Traits and objects; 3. Static parameters, `where` clauses and sizes; 4. Numbers; 5. Reductions and comprehensions, from "Loops and reductions are library code"; 6. Implementation limits, from "Specified, but not built" |

## Counts

54 entries:
- Rule: 23 (entries 1, 3, 4, 5, 6, 8, 9, 11, 12, 17, 21, 23, 25, 28, 30, 33, 34, 35, 38, 45, 48, 50, 54).
- Merged: 13 (2, 10, 13, 22, 24, 27, 29, 31, 32, 36, 39, 44, 53).
- Area part: 4 (7, 20, 37, 40).
- History: 13 (14, 15, 16, 19, 26, 41, 42, 43, 46, 47, 49, 51, 52).
- FACTS pass: 1 (18); a second fact for the pass is inside entry 33 (`Reflect`'s `members`).
- Discrepancy: 0 as a main destination; 1 inside entry 44 (U1).

Detail that moves into an area part at the install: `interpreter.md` from entries 5, 6, 10, 32; `compiler.md` from 6, 27, 28, 31, 32; `library.md` from 38 and 44.
