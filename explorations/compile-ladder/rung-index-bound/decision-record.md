<!-- The decision record of climb batch 21's rung B: the specification's passages that the index bound and the tuple rule revise (P-156), each with its original, its new text, its reason and the way back. -->
# Decision record: the index type of a subscript

The decision is P-156 (`explorations/coordinator/POSITIONS.md`), with the answers to climb batch 21's questions 1 and 2 (`explorations/coordinator/CLIMB-BATCH-21.md`, section 2), and fork 9 of that record, which the type-decisions judgement asked for (`explorations/reviews/type-decisions-review/judgement.md`, V2 and section 2, item 1). The Appendix I entry is `Specification/appendices/changes.tex`, "The index type of a subscript", `\seclabel{revival-index}`. Every box below cites it.

## 1. The rule and the bound, in short

- The library declares `trait Index extends Any end` (`Library/FortressLibrary.fsi:1245`, `.fss:1947`). `ZZ32` extends it, `Range` excludes it, and every index parameter of the library's generic indexed types is bounded `I extends Index`.
- A tuple type whose element types are all subtypes of `Index` is a subtype of `Index`. A tuple type excludes `Index` if and only if one of its element types excludes `Index`.
- `Index` extends only `Any`, as `Object` does, so a tuple of indices is no `Object`. A type that extends only `Index` (and `Any`) extends `Object` too.

## 2. Why the bound: the team's wish

The Working Draft's appendix of proposed features, item "Array indexing" (`Specification-1.0-frozen/appendices/future.tex:200-207`):

> The above overloaded declarations are not really a valid overloading. We want to say that the type variable I extends a type, say, Index which either excludes Range[I] or is a supertype of Range[I]. However, we cannot say that because when we invoke that subscripting method, we write a[1, 2, 3] where the arguments are passed as a tuple, (1, 2, 3). If we want to use Index, we need a magic to convert that tuple argument expression to something of type Index.

The bound is the first branch of their wish. Unbounded, `opr[i: I]` beside `opr[r: Range[\I\]]` is invalid at `I = Any`: the range subscript is the more specific there, and its result `Indexed[\E,I\]` is no `E` (row 783). The compiled checker, made to read symbolic operators, reported 124 errors of this family over the library (F-245).

## 3. Why the rule is the revival's departure

The team asked for a conversion. A conversion would change each index value that a subscript passes (`explorations/perf-probes/symbolic-operators-2/REPORT.md`, section 3.1). The rule makes a tuple type a subtype of a trait type instead, which the designers' tuple-type text forbids:

- Working Draft, `Specification-1.0-frozen/basic/types-vals-vars.tex:215-216`: "Every trait type also excludes every arrow type and every tuple type, and the special types () and BottomType."
- Working Draft, `:272-273`: "A tuple type excludes any non-tuple type other than Any."
- The 2012 Types chapter, `Documentation/Specification/Prose/Language/types.tick:341`: "Every trait type excludes \Void, \Bottom\ and every tuple type."; `:424`: "A tuple type excludes \Bottom, \Void, and every trait type, arrow type or function type."

The judgement (V2) keeps the rule as the least costly way and asks that it be recorded as a departure. The ways kept open: S5, a constraint `where { I excludes Range[\I\] }` (the team's open question, `future.tex`, item "Type variables in excludes clauses"); W3, range subscripts only at the fixed index types.

## 4. The passages

### 4.1 The immediate subtypes of `Any` (`basic/types-vals-vars.tex`, "Relationships between Types")

Original (`Specification-1.0-frozen/basic/types-vals-vars.tex:134-136`, the same in the base `Specification/basic/types-vals-vars.tex:151-153`): "...immediate subtypes of Any comprises of tuple types, arrow types, (), and Object."

New (`Specification/basic/types-vals-vars.tex:151-159`): "...immediate subtypes of Any comprises of tuple types, arrow types, (), Object, and Index, the trait of the types that a subscript takes, of which a tuple type whose element types are all subtypes of Index is a subtype", with a box.

Reason: `Index extends Any` makes it an immediate subtype of `Any`. Way back: drop the clause and the box.

### 4.2 Trait types and tuple types (`basic/types-vals-vars.tex`, "Trait Types")

Original (`Specification-1.0-frozen/basic/types-vals-vars.tex:215-216`; base `:232-233`): quoted in section 3.

New (`Specification/basic/types-vals-vars.tex:238-246`): "Every trait type also excludes every arrow type and the special types () and BottomType, and every trait type other than Index excludes every tuple type; Index excludes a tuple type only where one of its element types excludes Index", with a box.

Reason: the exclusion is the dual of the rule; without it the text says that `Index` excludes the tuple types that are its subtypes, the contradiction that the probe's checker patch left (`TypeAnalyzer.scala:560` at the base). Way back: the original sentence.

### 4.3 The rule (`basic/types-vals-vars.tex`, "Tuple Types")

Original (`Specification-1.0-frozen/basic/types-vals-vars.tex:263-269`): "Every tuple type is a subtype of Any. No other type encompasses all tuple types. Tuple types cannot be extended by trait types. Tuple types are covariant: ..." These stand unchanged.

New (`Specification/basic/types-vals-vars.tex:335-340`), after the covariance sentence: "A tuple type whose element types are all subtypes of the trait Index is a subtype of Index, the trait of the types that a subscript takes. Index extends Any and not Object, so such a tuple type is no subtype of Object."

Reason: section 3. Way back: remove the two sentences.

### 4.4 The exclusion of non-tuple types (`basic/types-vals-vars.tex`, "Tuple Types")

Original (`Specification-1.0-frozen/basic/types-vals-vars.tex:272-273`; base `:323-324`): quoted in section 3.

New (`Specification/basic/types-vals-vars.tex:342-351`): "A tuple type excludes any non-tuple type other than Any and Index, and it excludes Index if and only if one of its element types excludes Index.", with a box for 4.3 and 4.4.

Reason: as 4.2. Way back: the original sentence.

### 4.5 The implicit extension of `Object` (`basic/traits.tex`, "Trait Declarations")

Original (`Specification-1.0-frozen/basic/traits.tex:181-183`; base `Specification/basic/traits.tex:186-188`): "In addition, every trait except Any and Object implicitly extends the trait Object if it does not do so explicitly." and (`:193-194`; base `:198-199`) "This relation must form an acyclic hierarchy rooted at trait Object."

New (`Specification/basic/traits.tex:186-195`, `:205-210`): `Index` named beside `Any` and `Object`; two sentences say that `Index` extends only `Any`, as `Object` does, and that a trait that extends `Index` and no other trait but `Any` implicitly extends `Object` too; the hierarchy "rooted at the traits Object and Index"; a box.

Reason: question 1's answer, option 1 (P-156): a tuple of indices is an `Index` and never an `Object`, as P-42 keeps tuples out of `Object`. The second sentence keeps the rule that every other trait is an `Object` true of a type that a program declares an `Index` (fork 8): without it, `object Slot(n: ZZ32) extends Index end` would be no `Object` (the desugarer adds `Object` only to a clause that names nothing but `Any`). Way back: the original sentences, and `Index` declared as an ordinary trait, which question 1's options 2 and 3 describe.

### 4.6 The proposed feature (`appendices/future.tex`, "Traits and Objects", item "Array indexing")

Original (`Specification-1.0-frozen/appendices/future.tex:200-207`), quoted in section 2, stands unchanged.

New (`Specification/appendices/future.tex:208-214`): a box "Done, by subtyping in place of a conversion", naming `Index`, `ZZ32`, `Range`'s exclusion, the bound and the rule.

Way back: remove the box.

## 5. BoundedRange's `atMost`

Question 2's answer, option 2 (P-156): `atMost(n: I): FullRange[\I\] where { I extends Index }` (`Library/FortressLibrary.fsi:2257`, `.fss:4105`), the library's form for a member that applies at some instances only (`SumReduction`'s `distribute`s, `Library/FortressLibrary.fss:3441`, `:3443`). The specification's text does not name the method; Part IV renders it from the api. Way back: the probe's drop, question 2's option 1.
