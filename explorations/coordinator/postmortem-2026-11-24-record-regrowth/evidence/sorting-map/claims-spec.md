<!-- The claims of each of the 23 FACTS entries of chunk `spec` (section "The specification and the repository's lineage", F-162 to F-371), each with its subject, its kind, the other entries that say the same, and what today's checks say of it: the first step of the sorting map for the consolidation of 2026-11-24, by a worker that judged nothing new. -->

# Claims of chunk `spec`

How to read this file:

- Each claim line: the claim in one sentence — its subject label — its kind. A defect gives its ledger row; a row the entry calls fixed makes the claim history.
- Subject labels start with an area of the brief's list. A claim about the team's papers takes "the repository: the type group's papers".
- "Overlap" covers the claims of kind property, defect and choice. A search is a grep of every entry of `FACTS.md` for the words given in brackets; the entry itself is left out. A hit that only names the entry by its number is a pointer, not an overlap, and is left out.
- "Checks": the scout's file is `evidence/consolidation/scout-spec.md`; the list of stale claims is `evidence/stale-claims.md`. The scout checked that each cited file, test, commit, row and report heading exists and that each row's status agrees with the entry's words. The list of stale claims holds one finding for this chunk, on F-175, and says that this chunk had no writer: no claim was read against the tree. "Sound as checked" below means only what the scout checked.

## F-162 "Citing `Specification/library/apis/*.tex` as an independent standard is circular"

Claims:
1. Citing `Specification/library/apis/*.tex` as an independent standard is circular — the specification: generated api listings — property
2. The team says the library part "is largely automatically generated from the API code" (`structure.tex:25-31`) — the specification: generated api listings — property
3. The build renders these listings from the `.fsi` files of `Library/` and `LibraryBuiltin/`, and the listings are not in the tree — the specification: generated api listings — property
4. So a listing cannot justify an edit of an `.fsi` file; cite the `.fsi` line — the specification: generated api listings — property
5. The `fortress-repo` skill's `references/specification.md` holds the rule — the specification: generated api listings — pointer

Overlap:
- 1 to 4: none found in FACTS. Searched [library/apis], [circular], [generated from], [.fsi` line], [structure.tex] (one hit, F-262, on `lexical-structure.tex`, unrelated). Skill: `specification.md:13` states the same rule (scout item 5).

Checks: sound as checked (the quoted text is at `structure.tex:25-31`).

Shape: about how the project works and not about the tree: a rule of citation, one subject (the specification: generated api listings).
Title: citing the generated listings is circular; the body serves it.

## F-163 "Of the two copies of the specification, `Specification/` is the one to search and change"

Claims:
1. Of the two copies, `Specification/` is the one to search and change — the specification: its copies — property
2. `Specification-1.0-frozen/` is byte for byte the Working Draft of 2011-02-02, shown by a `git diff --quiet` of two commits — the specification: its copies — property
3. Only the frozen copy's `fortress.1.0.pdf` is the 1.0 text — the specification: its copies — property
4. `2f8b4331a` is the team's last commit of the draft — the specification: its copies — detail
5. In the frozen copy Appendix I is a stub that the team left; in `Specification/` it holds the revival's changes (P-96) — the specification: Appendix I — property
6. `Specification/fortress.pdf` is a draft build, so the team's `\note` boxes print — the specification: its copies — property
7. A third text, the team's unfinished restart, is later on some topics (F-166) — the specification: the restart's standing — pointer
8. The skill's `references/specification.md` says how to cite and change each copy — the specification: its copies — pointer
9. Detail in `reviews/spec-change-form.md` sections 5 and 7 — the specification: its copies — pointer

Overlap:
- 1, 2, 3, 6: none found in FACTS. Searched [Specification-1.0-frozen] (hits cite the frozen copy's lines only: F-21, F-294, F-402, F-169), [copies of the specification], [fortress.1.0.pdf]. Skill: `specification.md:6`.
- 5: F-174, F-175, F-227, F-278, F-294, F-319 cite entries of Appendix I. Searched [Appendix I]. None states the claim.

Checks: sound as checked: the scout ran the `git diff --quiet` and it exits 0; both PDFs found.

Shape: about how the project works: one subject (the specification: its copies).
Title: which copy to search and change, and what the frozen copy is; the body serves it.

## F-165 "The repository is a 2018 fork of `sirinath/fortress`, and `main` descends from `8fe1daa8f`"

Claims:
1. The repository is a 2018 fork of `sirinath/fortress` — the repository: lineage and the Java 9 port — history
2. `main` descends from `8fe1daa8f`, which copied a third-party Java 9 port onto the team's last commit, `a874948ac` — the repository: lineage and the Java 9 port — history
3. The port shares no history with this tree, and most of its 1,506 files are removed or redone — the repository: lineage and the Java 9 port — property
4. Of the port's code, only the `FTypeArrayList` fix for the JDK 8 `TreeSet` crash still runs — the repository: lineage and the Java 9 port — property
5. `lineage.md` lists what can go with no change of behaviour: that fix, replaced by `clean-ladder`'s two-line repair, and the port's dead jars, dead files and cosmetic edits — the repository: lineage and the Java 9 port — plan
6. The branch `clean-ladder` (`8332bd34f`) rebuilds on `a874948ac` without the port and never replaced `main` — the repository: lineage and the Java 9 port — history
7. Detail in `coordinator/lineage.md`, two sections — the repository: lineage and the Java 9 port — pointer

Overlap:
- 3, 4: none found in FACTS. Searched [8fe1daa8f], [sirinath], [FTypeArrayList], [clean-ladder], [Java 9]. Skill: `records.md:113` and `:119` state 1 and 2.

Checks: sound as checked for the commits and the branch; the scout did not re-check the `FTypeArrayList` claim in the tree (unsettled by the scout's own words, not listed as stale).

Shape: mostly history or plan: one subject (the repository: lineage and the Java 9 port).
Title: the fork and the commit `main` descends from; the body serves it, and adds what of the port runs and what can go.

## F-166 "On the topics of its Types chapter … the team's latest word is the unfinished restart"

Claims:
1. On the topics of its Types chapter, such as the exclusion rule and covariance, the team's latest word is the unfinished restart, not `Specification/` — the specification: the restart's standing — property
2. The restart, `Documentation/Specification/`, was never adopted — the specification: the restart's standing — history
3. Its Types chapter restates the exclusion rule as "instantiation exclusion" and adds `covariant` — the specification: the restart's standing — property
4. On the rest of static parameters, on traits beyond a stub, exceptions, components and the numeric library, `Specification/` is the only statement — the specification: the restart's standing — property
5. Which text governs is the curator's: `Specification/` stays the standard, the Types chapter is cited beside it, and `covariant` is future work (P-25) — the specification: the restart's standing — pointer
6. The type group's POPL 2019 paper is later than both (F-271) — the repository: the type group's papers — pointer
7. Detail in `coordinator/spec-lineage.md` section 6 and its check — the specification: the restart's standing — pointer

Overlap:
- 1, 3: F-167 (the specification states instantiation exclusion); F-21, F-44 (instantiation exclusion); F-47 ("The 2012 `covariant` keyword passes the compiled checker and dies at run time"); F-319 and F-371 (the restart on other topics: comparisons, the inference chapter). Searched [restart], [covariant], [instantiation exclusion], [Documentation/Specification].
- 4: F-169 ("The later restart adds nothing on the three"), F-371 ("The 2012 restart's chapter is a heading"). Searched [restart].

Checks: sound as checked; the scout did not separately check `Prose/Language/`.

Shape: about how the project works: one subject (the specification: the restart's standing), resting on a decision.
Title: the restart is the team's latest word on its Types chapter's topics; the body serves it.

## F-167 "The specification states instantiation exclusion and keeps each example that the rule refuses"

Claims:
1. The specification states instantiation exclusion and keeps each example that the rule refuses, marked "Not allowed" — the specification: instantiation exclusion — property
2. The calculi of Appendix A carry a callout that they predate the rule — the specification: instantiation exclusion — property
3. It builds P-97 — the specification: instantiation exclusion — pointer
4. It bars a `where`-clause variable from an `extends` clause's static arguments — the specification: instantiation exclusion — property
5. The covariance example, the empty list, the empty optional value and `Object`'s algebraic supertraits each stand beside the library's shape, which runs on both paths — the specification: instantiation exclusion — property
6. Except `Nothing[\String\]` on the compiled prelude (row 331) — the code generator: the prelude's `Nothing` — defect (row 331)
7. A subtrait of every instantiation stays as the counterexample that introduces the rule, and the internal appendix's refused examples get a callout each — the specification: instantiation exclusion — property
8. The checker does not refuse an object that extends two instantiations differing only in a `bool` argument (row 406) — the checker: instantiation exclusion — defect (row 406)
9. Nor one that extends two instantiations of one trait where one argument is the object's own static parameter (row 414) — the checker: instantiation exclusion — defect (row 414)
10. Detail in `rung-spec-route-a/decision-record.md` sections 2, 3 and 4.2 — the specification: instantiation exclusion — pointer

Overlap:
- 1, 5, 7: F-21 ("marks it 'Not allowed' beside the parametric `Nothing[\T\]` … (F-167)"); F-47 ("The exclusion rule refuses some of the specification's own examples"). Searched [Not allowed], [Nothing[], [instantiation exclusion].
- 2, 4: none found. Searched [Appendix A], [predate].
- 6: F-47 ("`Nothing[\String\]` does not yet run on the compiled path's prelude (row 331, F-167)"); F-184 ("compiles only against the compiled prelude's own `Nothing` (row 331, P-90)"). Searched [row 331].
- 8: F-48 ("passes the checker and dies in code generation (row 406, `XXXBoolExtendsTwice`)"); F-67 ("(row 406, open, a part of P-40 still to build)"). Searched [row 406].
- 9: F-48 ("dies at load with `ClassFormatError` (row 414, `XXXNatExtendsTwice`)"); F-129 ("passes the checker and dies at load (row 414)"). Searched [row 414].

Checks: sound as checked; rows 331, 406, 414 NEGATIVE-VERIFIED agree.

Shape: several subjects (the specification: instantiation exclusion; the checker: instantiation exclusion; the code generator: the prelude's `Nothing`).
Title: the specification states the rule and keeps the refused examples; claims 1 to 7 serve it, and claims 6, 8 and 9 are the implementations' gaps, which F-47 and F-48 also hold.

## F-168 "The specification's number chapters describe the flat library"

Claims:
1. The specification's number chapters describe the flat library — the specification: number chapters — property
2. Its advanced chapter on rational quantities stays word for word under a callout that marks it superseded — the specification: number chapters — property
3. The eight number types are siblings under `Number` (F-131) — the library: the flat number types — pointer
4. They convert by the library's coercions (P-74), and every other conversion is explicit, such as `asFloat(x)` — the specification: number chapters — property
5. The sign-refined types are gone; a program tests a value's sign at run time (P-80) — the specification: number chapters — property
6. ℚ holds +∞, −∞ and 0/0, and claims neither a field nor a total order — the specification: number chapters — property
7. `QQ` extends four algebraic traits, and their laws hold for the finite rationals — the specification: number chapters — property
8. F-172 gives the integer chapter's rules — the specification: integer rules — pointer
9. Detail in `rung-spec-numbers/decision-record.md` section 3, with lines of two chapters — the specification: number chapters — pointer

Overlap:
- 1, 3: F-131 ("The one library's number tower is flat … siblings under `Number`"). Searched [siblings under `Number`].
- 2: F-52 ("Neither path can use `RationalQuantity` as the specification …", `numbers-advanced.tex`). Searched [numbers-advanced].
- 4: F-311, F-323, F-324 (`asFloat` in the library). Searched [asFloat]: these are the library's, not the chapter's.
- 5: none found. Searched [sign-refined], [positive ℚ].
- 6: F-319 (0/0 in comparisons); F-90 (`floor`, `ceiling` at +∞, −∞ and 0/0). Searched [0/0].
- 7: none found. Searched [QQ` extends].

Checks: sound as checked; the entries it cites by number were not checked by the scout.

Shape: one subject (the specification: number chapters).
Title: the number chapters describe the flat library; the body serves it.

## F-169 "The Working Draft never wrote static-argument inference, never named the type that a library gives an integer numeral, and never named a range's integer type"

Claims:
1. The Working Draft never wrote static-argument inference: its inference chapter is a heading and notes — the specification: what the Working Draft left unwritten — property
2. It described numeral types such as `NaturalNumeral[\n,10,v\]` and said that libraries define coercions from numerals, but its own note leaves their hierarchy undescribed and it names no type that a library declares for a numeral — the specification: what the Working Draft left unwritten — property
3. Its ranges section names no integer type — the specification: what the Working Draft left unwritten — property
4. The later restart adds nothing on the three — the specification: the restart's standing — property
5. So a citation of the specification on them cites the revival, not the team — the specification: what the Working Draft left unwritten — property
6. The revised text states F-173's inference rule and F-170's ranges, and gives an integer numeral `NaturalNumeral[\n, r, v\]` (P-174) — the specification: static numerals — pointer
7. Detail in `evidence-B.md` sections 1 and 2, with lines of two `literals.tex` — the specification: what the Working Draft left unwritten — pointer

Overlap:
- 1, 5: F-371 ("The Working Draft's chapter on whole-program inference is a heading and notes (F-169 … reads the same chapter)"). Searched [static-argument inference], [Working Draft].
- 2, 6: F-345 (the literals chapter's numeral types); F-79, F-57 (`NaturalNumeral[\n, r, v\]`). Searched [NaturalNumeral], [four numbers].
- 3: F-170 (the specification's ranges over ℤ32); F-133 (the library's scalar ranges over `ZZ32`). Searched [ranges section], [ranges over].
- 4: F-166, F-371 (the restart). Searched [restart].

Checks: sound as checked.

Shape: one subject (the specification: what the Working Draft left unwritten).
Title: three things the Working Draft never wrote; the body serves it.

## F-170 "The specification's ranges are over ℤ32"

Claims:
1. The specification's ranges are over ℤ32, and its own ranges over wider integer types are respelled — the specification: ranges — property
2. An integer numeral, and a `nat` or `int` parameter, used as an operand of an explicit range converts to ℤ32 (row 485, fixed) — the specification: ranges — property
3. An operand of any other integer type is a static error — the specification: ranges — property
4. A loop whose counter needs a wider type runs over a range of ℤ32 and widens each element — the specification: ranges — property
5. The two examples that built `ZZ64` ranges run over ℤ32, and `ant testSpecData`, a gate step, runs both (F-114) — the harness and the gate: the specification's examples — detail
6. Detail in `rung-spec-ranges/decision-record.md`, and lines of `ranges.tex` — the specification: ranges — pointer

Overlap:
- 1 to 4: F-133 ("The one library's scalar ranges are over `ZZ32` alone", the library's side). Searched [ranges over], [row 485], [a#n].
- 5: F-114 (`ant testSpecData` runs 130 of the extracted examples). Searched [testSpecData].

Checks: sound as checked; row 485 FIXED agrees; `testSpecData` target found at `build.xml:1457`.

Shape: one subject (the specification: ranges).
Title: the specification's ranges are over ℤ32; the body serves it.

## F-171 "The specification reads a `comprises` clause as the restart's Types chapter does"

Claims:
1. The specification reads a `comprises` clause as the restart's Types chapter does: every value of the trait is a value of a listed type — the specification: comprises clauses — property
2. So a trait or object that extends the closed trait must be below a listed type, with two exceptions — the specification: comprises clauses — property
3. A trait with a `comprises` clause of its own may stay unlisted if each of its listed types is below a listed type of the closed trait — the specification: comprises clauses — property
4. A trait with static parameters may stay unlisted if at least one type extends it and every one is below a listed type — the specification: comprises clauses — property
5. A listed type may be an instantiation at the trait's static parameters or `where`-clause variables — the specification: comprises clauses — property
6. The text does not say whether a bare type variable may be listed — the specification: comprises clauses — defect (no row; an open question of the text)
7. Walk overflows its stack on a bare type variable listed (row 407) — walk: comprises clauses — defect (row 407)
8. The checker checks only the closed trait's immediate subtypes (row 487) — the checker: comprises clauses — defect (row 487)
9. The checker reads the clause in the subtrait's own type-variable names (row 489) — the checker: comprises clauses — defect (row 489)
10. The checker finds extenders by the simple text of a name (row 490) — the checker: comprises clauses — defect (row 490)
11. Whether the team's commented `comprises Integral[\I\] where [\I\]` is valid is open (F-121) — the specification: comprises clauses — pointer
12. Detail in `rung-spec-comprises/decision-record.md` section 2, and `traits.tex:246-269` — the specification: comprises clauses — pointer

Overlap:
- 1 to 5: F-175 ("The specification reads a `comprises` clause at the level of values in every passage"); F-76 ("which reads `comprises` at the level of values"); F-72 (the checker's reading for a generic subtrait). Searched [level of values], [comprises]. Skill: `revival-changes.md:30`.
- 6, 11: F-121 ("stays a comment, and no decision says whether …"). Searched [comprises Integral], [F-121].
- 7: F-62 ("passes the checker and overflows walk's exclusion test (row 407)"). Searched [row 407].
- 8: F-72 ("escapes the check, the hole that P-44 leaves (row 487)"); F-76 ("escapes it (row 487)"); F-175 (row 487). Searched [row 487].
- 9: F-72 ("The verdict changes when the extender renames its type variables"). Searched [row 489].
- 10: F-72 ("found by the simple text of the trait's name (row 490)"). Searched [row 490].

Checks: sound as checked; rows 407, 487, 489, 490 NEGATIVE-VERIFIED agree.

Shape: several subjects (the specification: comprises clauses; the checker: comprises clauses; walk: comprises clauses).
Title: the specification's value-level reading of `comprises`, as the restart's; claims 1 to 6 serve it, claims 7 to 10 are the implementations' gaps, held also by F-62, F-72, F-76 and F-175.

## F-172 "The specification's integer chapter states the library's integer rules"

Claims:
1. The specification's integer chapter states the library's integer rules — the specification: integer rules — property
2. The getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` keep the value or throw `IntegerOverflow` — the specification: integer rules — property
3. `narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits and throw nothing; `narrow` keeps the low 32 bits, so a value that does not fit wraps — the specification: integer rules — property
4. `ZZ` has neither `narrow` nor `widen` — the specification: integer rules — property
5. `LSHIFT` and `RSHIFT` work on the five integer types; on `ZZ` they are `shift`, exact at any count; on a fixed-size type `LSHIFT` loses the bits shifted out and throws nothing — the specification: integer rules — property
6. `GCD` and `LCM` are nonnegative, and one that a fixed-size type cannot hold throws `IntegerOverflow` — the specification: integer rules — property
7. At a negative power, the bases 1 and -1 give their exact power, 0 throws `DivisionByZero`, and any other base throws `IntegerOverflow` — the specification: integer rules — property
8. The library follows the same power rule under walk; the compiled path's own library does not (F-263) — the library: integer powers — pointer
9. Detail in `rung-spec-integer-rules/decision-record.md` section 2, and lines of two chapters — the specification: integer rules — pointer

Overlap:
- 2: F-331 ("the getters `asZZ32`, … keep the value or raise"), F-124. Searched [asZZ32]. Skill: `revival-changes.md:110`.
- 3, 4: F-132 ("the low-bits conversions `narrow`, `widen`, `signed`, `unsigned` and `big`, which keep the bits"); F-124 ("`narrow` keeps the low 32 bits"); F-303 (`narrow` on `RR64`, unrelated). Searched [narrow].
- 5: F-124 (compiled shifts), F-125 (walk's shifts), F-132, F-327 (`ZZ`'s `shift`). Searched [LSHIFT].
- 6: F-314, F-316 ("Under walk, `GCD` and `LCM` are nonnegative"), F-339 (folding of `GCD`). Searched [GCD].
- 7: F-263 (the integer powers' types and rule). Searched [negative power], [F-263].

Checks: sound as checked; F-263 not checked by the scout.

Shape: one subject (the specification: integer rules), each rule also held by an entry of the library's behaviour.
Title: the integer chapter states the library's rules; the body serves it.

## F-173 "The specification's type-inference chapter states the rule that the compiled checker builds"

Claims:
1. The type-inference chapter states the rule that the compiled checker builds: the declaration is chosen first, then its static arguments are inferred — the specification: type inference — property
2. It states P-46, P-48 and P-49 — the specification: type inference — pointer
3. A type parameter that a parameter's type mentions inside another type is fixed by the argument at that position — the specification: type inference — property
4. One that is the whole declared type of one or more parameters, and that nothing else fixes, takes the narrowest type within its bounds that every such argument has or converts into: `ZZ64` for a `ZZ32` and an `NN32` — the specification: type inference — property
5. Where there is none and no numeral settles the tie, it takes its bound, narrowed by the expected type's need of the return type (P-48); so does a type parameter that nothing fixes — the specification: type inference — property
6. Inference never gives a type parameter `BottomType` — the specification: type inference — property
7. The compiled prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate at `ZZ`; no callout names this (row 442, `XXXInferPromoteNN32`) — the checker: type inference — defect (row 442)
8. The callouts at `inference.tex:285-347` and `:448-512` give walk's departures, such as the return type `BottomType` of a function expression that declares none (row 587) — walk: type inference — defect (row 587)
9. Plain tests gate the bound rule for a lone type parameter on both paths: `InferLone*` — the specification: type inference — tests
10. Detail in `rung-instance-bound/REPORT.md` and `inference.tex:45-125` — the specification: type inference — pointer

Overlap:
- 1, 3, 4, 5: F-55 ("a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides"); F-73 ("takes the narrowest type that every one of its arguments converts into and its bound"); F-78 (the checker instantiates at the intersection of upper bounds, never `BottomType`); F-137, F-141 (walk's inference). Searched [narrowest type], [P-46], [InferLone].
- 6: F-78 ("never `BottomType`"). Searched [BottomType].
- 7: F-138 ("Compiled, `NN32` with `ZZ32` or `ZZ64` answers `ZZ` (row 442)"). Searched [row 442], [XXXInferPromoteNN32].
- 8: F-141 ("which takes `Bottom` (row 587)"). Searched [row 587].
- Skill: `revival-changes.md:68`.

Checks: sound as checked; rows 442 and 587 NEGATIVE-VERIFIED agree.

Shape: several subjects (the specification: type inference; the checker: type inference; walk: type inference).
Title: the inference chapter states the checker's rule; claims 1 to 6 serve it, claims 7 and 8 list departures held also in F-138 and F-141.

## F-174 "The specification states the type group's 2011 overloading model"

Claims:
1. The specification states the type group's 2011 overloading model: declarations of one name may differ in static parameters, and a generic declaration is read as one declaration over all its instances within its bounds — the specification: overloading with static parameters — property
2. It states P-45 and P-42 — the specification: overloading with static parameters — pointer
3. The section "Declarations with Static Parameters" states the OOPSLA 2011 paper's three rules: No Duplicates, Return Type and Meet — the specification: overloading with static parameters — property
4. It gives as the compiled path's, not the language's, the restriction that two generic declarations, one more specific with as many static parameters, declare them of the same kinds position by position — the specification: overloading with static parameters — property
5. The more specific one's return type must be a subtype of the other's with static parameters matched by position, so the checker refuses an override whose return type reorders them (row 398, fixed) — the checker: overloading rules — property
6. "Principles of Overloading" forbids overloading a functional whose one parameter's type is a type parameter with `T extends Any` written; one with no `extends` clause is exempt — the specification: overloading with static parameters — property
7. Both paths refuse such an overload: the checker in `OverloadingChecker.checkBoundAny`, walk since row 534's fix — the checker: overloading rules — property
8. Neither path runs every set that the rules allow; Appendix I's entry names the sets each path fails — the specification: overloading with static parameters — property
9. The checker refuses a generic declaration beside a plain one over a tuple of object types (row 1048) — the checker: overloading rules — defect (row 1048)
10. The code generator fails on two generic declarations whose bounds differ (row 537) — the code generator: generic overloads — defect (row 537)
11. Walk refuses at load the 2019 paper's valid set over an array list and a list (row 539) — walk: load check of overloads — defect (row 539)
12. Walk fails on two generic functional methods one of whose declared domains lies inside the other's: refused at load without static parameters, stopped at an extending object's first instance with them (rows 779, 780) — walk: load check of overloads — defect (rows 779, 780)
13. Detail: lines of `overloading.tex`, and `rung-spec-overloading/decision-record.md` sections 3 and 4 — the specification: overloading with static parameters — pointer

Overlap:
- 1, 3: F-50 ("lets overloads differ in static parameters, as the model of the OOPSLA 2011 paper does, which the specification now states (F-174)"); F-223 (the No Duplicates Rule). Searched [OOPSLA], [No Duplicates], [Meet Rule].
- 4, 5: F-50 (the checker's positional rule). Searched [row 398], [positional].
- 6, 7: F-49 ("The compiled checker refuses such a pair under the bound `Any`: a functional whose one parameter has a parametric type bounded …"). Searched [checkBoundAny], [T extends Any], [row 534], [bound `Any`].
- 9: F-75 ("`ident[\T\](x: T): T` beside `ident(x: (Circle, Circle))` (row 1048)"). Searched [row 1048].
- 10: F-50 ("generic arms on a bare type variable fail compiled (F-174, row 537)"). Searched [row 537].
- 11: F-27 ("a set of three generic declarations (row 539)"); F-252 (row 539). Searched [row 539].
- 12: F-257 ("two functional methods of generic traits (row 780)"); F-405 ("a nested pair of a generic trait's generic functional methods (row 780)"). Searched [row 779], [row 780].

Checks: sound as checked; rows 398 and 534 FIXED; rows 537, 539, 779, 780, 1048 NEGATIVE-VERIFIED; agree.

Shape: several subjects (the specification: overloading with static parameters; the checker: overloading rules; the code generator: generic overloads; walk: load check of overloads).
Title: the specification states the 2011 model; claims 1 to 8 serve it, claims 9 to 12 list each path's gaps, which other entries also hold.

## F-175 "The specification reads a `comprises` clause at the level of values in every passage"

Claims:
1. The specification reads a `comprises` clause at the level of values in every passage — the specification: comprises clauses — property
2. It builds P-60; Appendix I's entry "Traits with comprises clauses read at the level of values" records the change — the specification: comprises clauses — pointer
3. A call whose argument's static type stands between two closed traits runs the declaration that covers its value — the specification: comprises clauses — property
4. Where its declarations have no static parameters, its type is the intersection of its most specific declarations' return types — the specification: comprises clauses — property
5. The checker checks a `comprises` clause at the closed trait's immediate subtypes only (row 487) — the checker: comprises clauses — defect (row 487)
6. The checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546) — the checker: comprises clauses — defect (row 546)
7. The checker's verdict on an overload set can depend on the components compiled before it in the same JVM (row 547) — the checker: comprises clauses — defect (row 547, CONTESTED)
8. Detail: lines of `changes.tex`, and `rung-spec-overloading/decision-record.md` sections 8 and 9 — the specification: comprises clauses — pointer

Overlap:
- 1, 3, 4: F-171 (the specification's reading of `comprises` as the restart's); F-76 ("It builds P-60, which reads `comprises` at the level of values …; by the intersection of the return types of its most specific declarations"); F-386, F-408 (the intersection type of such a call). Searched [level of values], [intersection].
- 5: F-171, F-72, F-76 (row 487). Searched [row 487].
- 6: F-76 ("when a declaration that it compares has static parameters (row 546)"). Searched [row 546].
- 7: F-76 ("Its verdict on an overload set can depend on the components compiled before it in the same JVM (row 547)"). Searched [row 547].

Checks: stale-claims: "states row 547 as a departure without saying it is CONTESTED. Kind: a ledger row's status disagrees" (source `scout-spec.md`, F-175, Exists). The other claims sound as checked; rows 487 and 546 NEGATIVE-VERIFIED agree.

Shape: several subjects (the specification: comprises clauses; the checker: comprises clauses).
Title: the specification reads `comprises` at the level of values throughout; claims 1 to 4 serve it, claims 5 to 7 are the checker's departures, which F-76 holds in the same words.

## F-176 "The specification allows arithmetic in a size"

Claims:
1. The specification allows arithmetic in a size — the specification: sizes — property
2. Two size arguments are identical when written alike once each operation whose operands are numerals is replaced by its value — the specification: sizes — property
3. It states P-55 — the specification: sizes — pointer
4. By the grammar, a size is a numeral, a name, a sum, a difference, a product, a power to a numeral or a name, or a bracketed size — the specification: sizes — property
5. So `2 3` and `6` are identical, but `s0 s1` and `s1 s0` are not — the specification: sizes — property
6. Two types are identical when they have the same name and identical static arguments, sizes compared this way — the specification: sizes — property
7. Two sizes are known to differ when they are two different numerals; a static parameter, or a size holding one, is not known to differ from a numeral — the specification: sizes — property
8. F-146 gives the compiled checker, and F-222 walk's arithmetic — the specification: sizes — pointer
9. When walk infers a size parameter from a call's argument type, it matches a numeral and binds a name, and solves no size written as an operation, read in `IntNat.unifyStaticArg` and observed in row 767 — walk: size inference — defect (row 767)
10. Source: `types-vals-vars.tex:49-62` and the grammar's `IntExpr` — the specification: sizes — detail

Overlap:
- 1, 2, 5: F-146 ("The compiled checker accepts arithmetic in a size, and compares two sizes by their written form once it has computed …"); F-67 ("so `2 3` equals `6` but `m n` does not equal `n m` (F-146)"). Searched [arithmetic in a size], [sizes identical], [2 3]. Skill: `revival-changes.md:83`.
- 4, 6, 7: none found. Searched [known to differ], [IntExpr].
- 9: F-146 ("a parameter that a parameter type writes inside an operation (row 767)"). Searched [row 767], [unifyStaticArg].

Checks: sound as checked; the scout notes `unifyStaticArg` at `IntNat.java:127`, ending near `:146`, where the entry cites `:126-147`; row 767 NEGATIVE-VERIFIED agrees. The entry names no report; the history names Appendix I's entry as its source.

Shape: one subject (the specification: sizes), with walk's gap.
Title: arithmetic in a size and identity by written form; the body serves it.

## F-223 "The specification's No Duplicates Rule is the papers' non-strict rule, and the compiled checker applies it"

Claims:
1. The specification's No Duplicates Rule is the papers' non-strict rule: two declarations of one name may not each be applicable to every call to which the other is, as in the papers of 2011 and 2019 (P-26) — the specification: overloading with static parameters — property
2. The compiled checker applies it to functional methods wherever their `self` parameters stand, abstract ones included, with its message naming the first declaration's domain — the checker: overloading rules — property
3. It checks symbolic operators too (F-281): `opr ||(self, y: S)` beside `opr ||(x: S, self)` is refused — the checker: overloading rules — property
4. Walk refuses at load such a pair of two generic declarations whose parameter types mention their static parameters, as `dup[\T\](x: Box[\T\])` beside `dup[\U\](x: Box[\U\])` — walk: load check of overloads — property
5. Walk refuses too a generic declaration beside one whose parameter types are its bounds, with its message — walk: load check of overloads — property
6. Gated by six compiled `XXXNoDuplicatesRule*` tests and three walk tests — the checker: overloading rules — tests
7. Detail in four report sections — the checker: overloading rules — pointer

Overlap:
- 1: F-174 (the specification states the three rules). Searched [No Duplicates], [non-strict].
- 2, 3: F-80 ("a functional method beside a concrete one in the same trait, with the same parameter types, is refused by the No Duplicates Rule"; its tests include `XXXNoDuplicatesRuleAbstract`); F-296 ("The No Duplicates Rule now refuses `g[\T\](a: T)` beside `g(a: Any)`"); F-274 (row 759's message 'There are multiple declarations of g with the same parameter type: T'). Searched [XXXNoDuplicatesRule], [same parameter type].
- 4, 5: F-274 ("Under walk, two declarations whose declared domains are equal are refused by the No Duplicates Rule …"; gated by `GenericBesideGenericSameDomain`, `GenericBesidePlainSameDomain`, `NoDuplicatesRuleWalk`); F-252, F-257 (walk's declared-domain reading by the No Duplicates Rule). Searched [GenericBesideGenericSameDomain], [No Duplicates].

Checks: sound as checked; all named tests found.

Shape: several subjects (the specification: overloading with static parameters; the checker: overloading rules; walk: load check of overloads).
Title: the rule is the papers' non-strict one, and the checker applies it; the body serves both, and adds walk's refusals, which F-274 holds with the same tests.

## F-271 "The type group's POPL 2019 paper gives P-48's instance rule, and its soundness proof does not cover the library's F-bounded functions"

Claims:
1. The type group's POPL 2019 paper gives P-48's instance rule: a type parameter that a call's arguments do not fix takes the intersection of its upper bounds — the repository: the type group's papers — property
2. The paper is later than both the specification and the team's restart (F-166) — the repository: the type group's papers — property
3. Its calculus does not let a method type parameter occur in an upper bound, so F-bounded method parameters, as in `SUM` and `BIG MAX`, are outside its soundness proof — the repository: the type group's papers — property
4. It also leaves out top-level functions and functional methods, among other limits — the repository: the type group's papers — property
5. `reviews/decisions-review/popl-recheck.md` checks the curator's decisions against the paper — the repository: the type group's papers — pointer
6. Detail in `ParkPOPL2019-extract.md` sections 6 and 8 — the repository: the type group's papers — pointer

Overlap:
- 1: F-78 (the checker instantiates at the intersection of upper bounds); F-84 ("P-48 gives it the intersection of its upper bounds"); F-273 (the specification's run-time instance by the paper's rule). Searched [POPL 2019], [intersection of its upper bounds].
- 2: F-166 ("The type group's POPL 2019 paper is later than both (F-271)"). Searched [POPL 2019].
- 3: F-141, F-228 ("An F-bounded parameter stays open" under walk). Searched [F-bounded].
- 4: none found. Searched [functional methods] with [paper], [calculus].

Checks: sound as checked.

Shape: one subject (the repository: the type group's papers).
Title: the paper gives P-48's rule, and its proof does not cover F-bounded functions; the body serves both halves.

## F-272 "The coercion example of the specification's 'Coercion Resolution' … declares the exclusions that the chapter's definitions need"

Claims:
1. The coercion example of "Coercion Resolution", over its own traits `ZZ32`, `ZZ64` and `ZZ128`, declares `ZZ32 excludes { ZZ64, ZZ128 }` and `ZZ64 excludes { ZZ128 }` — the specification: coercion resolution — property
2. A type `T` rejects `U` when every type that coerces to `T` excludes `U` — the specification: coercion resolution — property
3. `T` is no less specific than `U` when it is a subtype of `U`, or excludes, coerces to and rejects it, so the choice of the more specific declaration depends on the exclusions — the specification: coercion resolution — property
4. In the rung's probe, with the traits renamed `S32`, `S64`, `S128`, the revised example ran on both paths: `f(S32Of)` chose `f` on `S64` and gave 1 — the specification: coercion resolution — detail
5. No gated test runs the printed example — the specification: coercion resolution — property
6. Row 394, fixed, names `tests/CoercionMostSpecificRungC.fss`, a walk test of the choice over three traits of the example's shape, each excluding both others — walk: dispatch by coercion — history
7. Detail in `rung-spec-integer-rules/decision-record.md` section 4, decision 6, and lines of `conversions-coercions.tex` — the specification: coercion resolution — pointer

Overlap:
- 1, 2, 3, 5: F-349 (walk's choice by the specification's "Coercion Resolution", the declaration than which no other is more specific). Searched [Coercion Resolution], [ZZ128], [rejects], [CoercionMostSpecific].
- 6: none found. Searched [row 394].

Checks: sound as checked; row 394 FIXED agrees; the scout found no `.test` beside `CoercionMostSpecificRungC.fss` and did not re-read the cited lines (the history says they moved on 2026-11-09).

Shape: one subject (the specification: coercion resolution).
Title: the example declares the exclusions that the definitions need; the body serves it.

## F-273 "The specification gives the run-time instance of a generic declaration that dispatch reaches, and that the static call did not select, by the POPL 2019 paper's rule"

Claims:
1. The specification gives the run-time instance of a generic declaration that dispatch reaches, and that the static call did not select, by the POPL 2019 paper's rule — the specification: type inference — property
2. It builds P-48 — the specification: type inference — pointer
3. A declaration that the static call selected runs at the instance inferred for the call (F-173) — the specification: type inference — pointer
4. Where an argument's value fixes a type parameter, as a value of `Tag[\X\]` fixes `X`, the rule and both paths agree — the specification: type inference — property
5. Where a type parameter is a parameter's whole type, the argument's run-time type only bounds it from below; the rule gives it its declared bound, narrowed by the call's static type's need of the return type — the specification: type inference — property
6. The dispatch paragraph's callout says both paths take the argument's run-time type there instead; walk always will, having no static types (P-48) — walk: run-time instance of generics — property
7. The compiled path does so because its dispatcher is not given the call's static type (row 538, `XXXGenericInstanceUnfixed`) — the code generator: run-time instance of generics — defect (row 538)
8. The compiled path does not yet run the paragraph's second example, a generic declaration beside a plain one, reached through an argument of static type `Any` (row 496) — the code generator: run-time instance of generics — defect (row 496)
9. Detail: `overloading.tex:312-349`, and `rung-spec-overloading/decision-record.md` sections 5 and 6 — the specification: type inference — pointer

Overlap:
- 1, 4, 5: F-173 (the declaration the static call selected); F-271 (the paper's instance rule); F-55 ("walk from their run-time types"). Searched [dispatch reaches], [run-time type only bounds], [POPL 2019].
- 6: F-55, F-137, F-141 (walk's inference from run-time types). Searched [run-time type].
- 7: none found. Searched [row 538], [XXXGenericInstanceUnfixed].
- 8: F-136 ("through an argument of static type `Any` at a program's object (row 496), still die with `ClassCastException`"). Searched [row 496].

Checks: sound as checked; rows 538 and 496 NEGATIVE-VERIFIED agree.

Shape: several subjects (the specification: type inference; walk: run-time instance of generics; the code generator: run-time instance of generics).
Title: the specification's run-time instance by the paper's rule; claims 1 to 5 serve it, claims 6 to 8 give each path's departure.

## F-300 "The type group's POPL 2019 paper, its technical report and the report's LaTeX sources are in `Papers/Variance/`"

Claims:
1. The POPL 2019 paper, its technical report and the report's LaTeX sources are in `Papers/Variance/` — the repository: the type group's papers — property
2. The paper (Park, Hong, Steele and Ryu, doi:10.1145/3290324) is `3290324-popl19w.pdf`, under the CC BY-NC 4.0 licence that its first page prints — the repository: the type group's papers — property
3. The technical report, with the formalization in its appendices, is `3290324-popl19-TR.pdf`; the report and its sources are included with Sukyoung Ryu's permission, and the report prints no licence — the repository: the type group's papers — property
4. ACM's `acmart.cls` and `ACM-Reference-Format.bst` there carry ACM's own terms — the repository: the type group's papers — property
5. The working notes on the paper, its full text and its talk's transcript stay in `research/extracts/` — the repository: the type group's papers — property
6. Read in the tree; detail in `Papers/Variance/README.md`, "Permission and licence" — the repository: the type group's papers — pointer

Overlap:
- 1 to 5: none found. Searched [Papers/Variance], [licence], [license] (F-46 hit: "licenses that identification", unrelated).

Checks: sound as checked: every named file found.

Shape: about how the project works and not about the tree's code: one subject (the repository: the type group's papers).
Title: where the paper, report and sources are; the body serves it, with their licences.

## F-319 "A comparison at a NaN or at 0/0 answers `false`, on the specification's word too"

Claims:
1. A comparison at a NaN or at 0/0 answers `false`, on the specification's word too — the specification: comparisons at NaN — property
2. It builds P-159 — the specification: comparisons at NaN — pointer
3. The overview of operators says `<`, `<=`, `>` and `>=` return `false` at a NaN and at 0/0, `CMP` returns `Unordered` at a NaN, and -1/0 and 1/0 are ordered below and above every finite rational; Appendix I has an entry — the specification: comparisons at NaN — property
4. Walk answers so, and the compiled path at a NaN, its library having no `CMP` on floats — walk: comparisons at NaN — property
5. Nothing raises `FloatingComparisonError` or `RationalComparisonError`, which stay declared — the library: comparisons at NaN — property
6. Walk departs at 0/0 against itself: `true` for `=`, `<=` and `>=`, and `EqualTo` for `CMP` (row 440) — walk: comparisons at NaN — defect (row 440)
7. The team's restart's `operator-overview.tick` still says both comparisons raise — the specification: the restart's standing — property
8. The rung that revised `Specification/` left the restart as the team wrote it, outside its files (batch 26's rung S) — the specification: the restart's standing — history
9. Test `tests/ComparisonAtNaNWalk` and the NaN asserts of two compiled tests — walk: comparisons at NaN — tests
10. Detail in `rung-spec-nan-comparison/REPORT.md` sections 1, 2 and 7 — the specification: comparisons at NaN — pointer

Overlap:
- 1, 3, 4: F-92 ("Unordered deciding elements give `false`, or `Unordered` for `CMP`", for pairs and triples); F-122 (NaN in `round`), F-52, F-303 (NaN elsewhere). Searched [NaN], [Unordered], [ComparisonAtNaN].
- 5: none found. Searched [FloatingComparisonError].
- 6: none found. Searched [row 440].
- 7: F-166 (the restart's standing). Searched [Documentation/Specification], [restart].

Checks: sound as checked; row 440 NEGATIVE-VERIFIED agrees; the scout lists no `.test` beside `ComparisonAtNaNWalk.fss`.

Shape: several subjects (the specification: comparisons at NaN; walk: comparisons at NaN; the library: comparisons at NaN; the specification: the restart's standing).
Title: a comparison at NaN or 0/0 is `false`, also by the specification; the body serves it, and adds the restart's contrary text.

## F-345 "The specification states, in the revision form, the static numerals (P-174, P-176) and P-171's string literals"

Claims:
1. The specification states, in the revision form, the static numerals (P-174, P-176) and P-171's string literals — the specification: static numerals — property
2. The literals chapter gives a numeral a compile-time numeral type, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]` below `Numeral`, its four numbers as static arguments, and every number type's coercion generic over the four numbers, converted where it stands and folded — the specification: static numerals — property
3. It also gives the conversion where a place fixes a type and the default elsewhere, a program's type receiving a numeral as written, its minus on the coercion's result, any other static expression through the default's coercion, a `where` clause over the four numbers refused statically, and numeral types written only as parameter types (`literals.tex:98-302`) — the specification: static numerals — property
4. The constant chapter gives the fold, converted from its exact value at a library type (`constant.tex:80-126`) — the specification: static numerals — property
5. The numbers chapter gives the coercions, with no `=` pairs and no `asFloat` on a numeral type (`numbers.tex:47-71`) — the specification: static numerals — property
6. The binary chapter's numeral declarations are expressible now and left out — the specification: static numerals — property
7. Appendix I gives three entries, whose Effects name each departure of the two implementations with its row — the specification: Appendix I — property
8. Test: the specification's build (`ant genSource`, `ant tex`), 0 warnings by the skill's grep — the harness and the gate: the specification's build — tests
9. Detail in `rung-static-numerals-spec/REPORT.md` — the specification: static numerals — pointer

Overlap:
- 1, 2, 3: F-169 ("gives an integer numeral the Working Draft's `NaturalNumeral[\n, r, v\]`, its four numbers as static arguments (P-174)"); F-79, F-57, F-131, F-341, F-342 (the numeral types and their conversion in the implementations); F-343 (string literals as one object, P-171's neighbour). Searched [RadixPointNumeral], [four numbers], [string literals], [revival-numerals], [revision form], [P-171].
- 4: F-402 (the constant chapter's `||` fold); F-339 (both paths fold numerals exactly). Searched [constant.tex].
- 5: F-324 ("written `asFloat(x) = y`", the library's side). Searched [asFloat].
- 6: F-402 ("P-174 leaves out the binary chapter's numeral coercion and its `opr ||` with a numeral"). Searched [binary chapter].
- Skill: `revival-changes.md:93`, `:95`, `:97`.

Checks: sound as checked; the scout did not run `ant genSource` or `ant tex`, nor grep the Appendix I entries.

Shape: one subject (the specification: static numerals), with string literals.
Title: the specification states the static numerals and P-171's string literals; the body serves the numerals and names the string literals only in claim 1 and 7.

## F-359 "The prelude's built-in number types were objects when first written, and became traits to nest them and to hold the literal objects"

Claims:
1. The prelude's built-in number types were objects when first written: `object ZZ32 extends Number`, with `ZZ64`, `RR32` and `RR64`, of 2009-03-03, the shape of the interpreter's library — the repository: history of the number types — history
2. They became traits on 2009-03-30, to nest them and to hold the literal objects, and stayed traits when the tower was flattened on 2009-08-31; later built-in types followed the pattern — the repository: history of the number types — history
3. Both reasons are gone from both libraries — the library: the flat number types — property
4. A paper on the mapping calls the hand-written classes that carry these traits at run time special cases "for the time being" (`TypeMapping.tex:91-92`), and gives as the rule that a trait is an interface and an object a final class — the repository: the type group's papers — property
5. The plan for unboxing (`Unbox.java`) is written over objects and `comprises` clauses and has no case for an open trait — the code generator: the unboxing plan — property
6. So the trait form of a type that a hand-written class carries is later in date for every type, and the sources do not settle whether it is a decision of the team's in the sense of P-26 — the repository: history of the number types — property
7. Read in the history and the texts, with a `git log -S` command — the repository: history of the number types — detail
8. Detail in `reviews/carriers-ways-2026-11-13.md` — the repository: history of the number types — pointer

Overlap:
- 1, 2, 6: F-388 (the prelude's seven number types are value objects now: the state that this history ends in); F-379 (walk and the one library declare them as objects). Searched [became traits], [object ZZ32], [CompilerBuiltin].
- 3: F-131 (the flat tower). Searched [nest], [literal objects].
- 4: F-44 (`TypeMapping.tex:125`, trait relations as Java ones). Searched [TypeMapping], [special cases].
- 5: F-18 ("The plan in `compiler/optimization/Unbox.java` lists what to unbox"). Searched [Unbox].

Checks: sound as checked for the commits and files; the scout did not re-run the dated claims or the `git log -S` command.

Shape: mostly history or plan: one subject (the repository: history of the number types).
Title: the number types were objects, became traits for two reasons, and both reasons are gone; the body serves it.

## F-371 "The team's texts describe no inference of the types that a declaration leaves out"

Claims:
1. The team's texts describe no inference of the types that a declaration leaves out, beyond copying them from the exported api — the specification: omitted types — property
2. For a method's types taken from the declaration that it implements, the Working Draft holds one sentence and two printed examples, `catalyze(reaction)` in `Enzyme` and `append(xs)` in `Cons`, and no rule — the specification: omitted types — property
3. The Working Draft's chapter on whole-program inference is a heading and notes (F-169) — the specification: what the Working Draft left unwritten — property
4. The 2012 restart's chapter is a heading, and the type group's papers infer only a call's type arguments and write every parameter type — the specification: the restart's standing — property
5. So row 405's gap, and a parameter whose type only its uses could give, as in the overview's `f(x) = x^2 + sin x - cos 2 x`, have no design of the team to build — the checker: omitted types — defect (row 405)
6. A citation for them cites examples, not a rule — the specification: omitted types — property
7. Read in the specification, the restart and `Papers/`; not searched: the 2012 patents, the printed 1.0 alpha and beta, and an email of 2007 — the specification: omitted types — detail
8. Detail in `reviews/omitted-types-intent-2026-11-16.md`, two sections — the specification: omitted types — pointer

Overlap:
- 1: F-370 ("The compiled checker takes each type that a component's declaration leaves out from the exported api's declaration of it"); F-254 (a return type taken from the api); F-266 ("the specification asks for inference of a type that a declaration leaves out, and does not describe it"). Searched [leaves out], [omitted], [exported api].
- 2, 6: none found. Searched [catalyze], [Enzyme].
- 3: F-169. Searched [heading and notes].
- 4: F-166, F-169 (the restart). Searched [restart].
- 5: F-370 ("row 405, on the untyped parameter on both paths"). Searched [row 405].

Checks: sound as checked; row 405 NEGATIVE-VERIFIED agrees; the entry states what was not searched.

Shape: one subject (the specification: omitted types), with the gap it bears on.
Title: the team's texts describe no inference of omitted types; the body serves it.

## Subject labels used, with their entries

- the specification: generated api listings: F-162
- the specification: its copies: F-163
- the specification: Appendix I: F-163, F-345
- the specification: the restart's standing: F-163, F-166, F-169, F-319, F-371
- the repository: lineage and the Java 9 port: F-165
- the repository: the type group's papers: F-166, F-271, F-300, F-359
- the repository: history of the number types: F-359
- the specification: instantiation exclusion: F-167
- the checker: instantiation exclusion: F-167
- the code generator: the prelude's `Nothing`: F-167
- the specification: number chapters: F-168
- the library: the flat number types: F-168, F-359
- the specification: integer rules: F-168, F-172
- the library: integer powers: F-172
- the specification: what the Working Draft left unwritten: F-169, F-371
- the specification: static numerals: F-169, F-345
- the specification: ranges: F-170
- the harness and the gate: the specification's examples: F-170
- the harness and the gate: the specification's build: F-345
- the specification: comprises clauses: F-171, F-175
- the checker: comprises clauses: F-171, F-175
- walk: comprises clauses: F-171
- the specification: type inference: F-173, F-273
- the checker: type inference: F-173
- walk: type inference: F-173
- walk: run-time instance of generics: F-273
- the code generator: run-time instance of generics: F-273
- the specification: overloading with static parameters: F-174, F-223
- the checker: overloading rules: F-174, F-223
- the code generator: generic overloads: F-174
- walk: load check of overloads: F-174, F-223
- the specification: sizes: F-176
- walk: size inference: F-176
- the specification: coercion resolution: F-272
- walk: dispatch by coercion: F-272
- the specification: comparisons at NaN: F-319
- walk: comparisons at NaN: F-319
- the library: comparisons at NaN: F-319
- the code generator: the unboxing plan: F-359
- the specification: omitted types: F-371
- the checker: omitted types: F-371

The labels "walk: load check of overloads", "walk: dispatch by coercion" and "the specification: static numerals" are also used in `claims-landed-3.md`.

## Entries that overlap

- The value-level reading of `comprises`: F-171 and F-175 (the specification), with F-76 and F-72 (the checker), which repeat rows 487, 489, 490, 546 and 547 nearly word for word; F-62 (row 407).
- Overloading with static parameters: F-174 and F-223 (the specification's rules), with F-50, F-80, F-274, F-296 (the checker and walk under the same rules), and the gap rows 537 (F-50), 539 (F-27, F-252), 779 and 780 (F-257, F-405), 1048 (F-75).
- Type inference: F-173 and F-273 (the specification), F-271 (the paper), with F-55, F-73, F-78, F-84, F-137, F-141 (the implementations), rows 442 (F-138), 587 (F-141), 496 (F-136).
- Instantiation exclusion: F-167 with F-21, F-44, F-47, F-48, F-67, F-129, F-184 (rows 331, 406 and 414 each in two or three entries).
- What the Working Draft and the restart left unwritten: F-169, F-371, F-166, F-319 (each names what the restart says or lacks).
- The integer chapter and the library's integer behaviour: F-172 with F-124, F-125, F-132, F-263, F-314, F-316, F-327, F-331.
- Sizes: F-176 with F-146 and F-67 (`2 3` and `6`), row 767 in F-176 and F-146.
- Static numerals in the specification: F-345 and F-169, with F-402, F-79, F-57, F-341, F-342.
- The number types' history and present form: F-359 with F-388, F-379, F-131.
- The POPL 2019 paper: F-271, F-300, F-273, F-166.
- Coercion resolution: F-272 with F-349.

## What the search could not settle

- F-175, claim 7: the list of stale claims says that the entry gives row 547 as a departure without saying that it is CONTESTED; F-76 gives row 547 in the same words and the list holds nothing for F-76. Whether F-76 has the same fault was not settled here.
- F-165, claim 4: the scout did not re-check in the tree that the `FTypeArrayList` fix is the only piece of the port that still runs.
- F-359, claims 1 and 2: the scout did not re-run the dated claims or the `git log -S` command.
- F-345, claim 8: the specification's build and its warning count were not run.
- F-176, claim 9: the cited range `IntNat.java:126-147` against the method's lines `:127` to about `:146` (the scout's note); not judged.
- F-272, claim 6, and F-319, claim 9: the scout lists no `.test` file beside the named walk tests; whether the harness needs one was not judged.
- Every claim of this chunk: no source read it against the tree (the list of stale claims, last section), so "sound as checked" means only that the cited items exist.
