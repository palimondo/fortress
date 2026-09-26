# Decision record: the specification revised for route A (rung S, climb batch 5)

This is the decision record that Pavol's requirement of 2026-09-24 asks for (`explorations/coordinator/POSITIONS.md:85`): the original text of every revised passage, why it was changed, and route C as the way back. Every entry of the revival section in Appendix I of the specification (`Specification/appendices/changes.tex`) cites this file. The base is `6030e4b36`. "The Working Draft of February 2011" is the unrevised copy under `Specification-1.0-frozen/` (`POSITIONS.md:145`; `FACTS.md`, "`Specification-1.0-frozen/` is byte for byte the working draft of 2011-02-02, not the 1.0 text, and the specification's own change machinery is unused").

## 1. The list, written before any edit

Every passage of `Specification/` outside `library/apis/` that instantiation exclusion refuses, or that states the rule's opposite, with its verdict and whether this rung revises it. The start is the judgement's inventory (`explorations/reviews/spec-refused-examples-judgement.md` sections 3.1 to 3.5 and 7); the check is the gatherer's scan (`explorations/reviews/spec-refused-examples.md`, "What was found") and a scan of this rung's own, described after the list. The frozen copy's line numbers equal the base's in every file below except `basic-lib/objects.tex`, where the base has two more lines at `:17-18` (the stray `\tracingcommands` line of `5a68404fd`), so its line `n` above 18 is the frozen copy's `n-2`; checked with `cmp` for each file.

Revised now:

1. `Specification/basic/trait-parameters.tex:339-351` (E1, the covariance example): "Trait declarations are allowed to extend other instantiations of themselves", `trait C[\S\] extends C[\T\] where {S extends T, T extends Object}`, "we have expressed the fact that the static parameter S of C is covariant". States the rule's opposite (`:339-340`) and its example is refused. Verdict: judgement section 3.1, E1, option 1: kept as "Not allowed", with the library's widening function with bounded static parameters as the way (`Library/CovariantCollection.fss:15-36`); the callout carries the one sentence on the `covariant` modifier (`POSITIONS.md:147`). Frozen: `Specification-1.0-frozen/basic/trait-parameters.tex:339-351`.
2. `Specification/basic/trait-parameters.tex:354-380` (E2, "a subtrait of every instantiation"): "the following trait declaration is legal", `trait C extends D[\T\] where {T extends Object}`, and the paragraph on why it is dangerous. States the opposite (`:355-356`, `:365-367`) and its example is refused. Verdict: section 3.1, E2, option 1: kept as the counterexample that introduces the rule, with the sentence that it is not allowed and why. Frozen: same file, `:354-380`.
3. `Specification/basic/trait-parameters.tex:383-399` (E3, the `Empty` list): `object Empty extends List[\T\] where {T extends Object}`. Refused. Verdict: section 3.1, E3, option 1: kept as "Not allowed", with `object Empty[\T\] extends List[\T\]` beside it. Frozen: same file, `:383-399`.
4. The where-clause section as a whole, `Specification/basic/trait-parameters.tex:284-399`: one new sentence, that a where-clause variable may not appear as a static argument in an `extends` clause (judgement sections 5 and 7).
5. `Specification/basic/traits.tex:174-180`, Luchangco's note that a trait can extend itself through hidden type variables ("we could just rule this a special case"), and its companion `:195-197` ("there may be self cycles in explicit extension due to hidden type variables, as described above"). States the rule's opposite as an open possibility. Verdict: section 3.1, last bullet, and section 5: answered by the rule, in the where-clause section, with a cross-reference at the note. The notes stay as the team wrote them. Frozen: same file, same lines.
6. `Specification/basic/types-vals-vars.tex:184-189` with `:208-216`: the relations are "the smallest ones that satisfy all the properties given", and no property makes two instantiations exclude each other, so the text allows a type below two instantiations (`FACTS.md`, "The compiled checker's exclusion rule is the designers' "multiple instantiation exclusion"..."). States the opposite by omission. Verdict: section 5: the rule added once as a property of exclusion beside `:210-216`; the definition's form is kept. Frozen: same file, same lines.
7. `Specification/basic/traits.tex:284-292`, beside the "Not allowed" `InclusiveMolecule`: the rule on declarations added (section 5). Not itself refused.
8. `Specification/basic-lib/convenience.tex:34-53` (E4): `trait Maybe[\T\] comprises { Nothing, Just[\T\] }`, `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`, and the sentence "An optional value v is either Nothing or Just(v)". Refused (and ill-formed by the grammar, `Specification/basic/objects.tex:84-86`). Verdict: section 3.2, option 1: `value object Nothing[\T\] extends Maybe[\T\]` with no `excludes` clause, `Maybe[\T\] comprises { Nothing[\T\], Just[\T\] }`. Frozen: same file, same lines.
9. `Specification/basic/exceptions.tex:111-130`: "These fields are default to Nothing", `getter message(): Maybe[\String\] = Nothing`, `getter chain(): Maybe[\Exception\] = Nothing`, "where an optional value v is either Nothing or Just(v)". Uses the refused declaration. Verdict: section 3.2: `Nothing[\String\]` and `Nothing[\Exception\]`. Frozen: same file, same lines.
10. `Specification/basic-lib/exception.tex:21-24`: "These fields are default to Nothing where an optional value v is either Nothing or Just(v)". Same verdict. Frozen: same file, same lines.
11. `Specification/basic-lib/objects.tex:127-141` (E7, `Object`): `trait Object extends { Any, EquivalenceRelation[\Object,===\], IdentityOperator[\Object\] } excludes { Tuple }` and the prose that `Object` "uses algebraic constraints ... to describe the properties of the existing operators more abstractly". Refused by reading (judgement section 3.4). Verdict: section 3.4, option 1: `Object` without the algebraic supertraits, as the library has it (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32`), with `===` an operator on `Any` (`Library/FortressLibrary.fsi:2474`). Frozen: `Specification-1.0-frozen/basic-lib/objects.tex:125-139`.
12. `Specification/basic-lib/objects.tex:144-158` (`Tuple`): the same clause and "As with the type Object, the type Tuple uses algebraic constraints to describe its existing methods". Not refused itself; its prose leans on `Object`'s, and the judgement has the rung rewrite both (section 3.4). Frozen: `:142-156`.
13. `Specification/basic-lib/objects.tex:80-84`: "In Object this property is asserted abstractly using the algebraic constraints of Chapter ...". Not in the judgement's inventory: found by this rung's scan. It states E7's clause in prose and becomes false with it, so it follows the verdict of item 11. Frozen: `:78-82`.
14. `Specification/appendices/internal-document.tex:305-360` (E8, "Disjunctive Constraints"), `:363-414` (E9, "Weirdness with Multiple Inheritance and Polymorphism") and `:483-509` (E10, "Conditional Subtyping"). E8's premise is refused, E9 is the rule's own case, E10 is refused as E6 is. Verdict: section 3.5: one sentence at each. Frozen: same file, same lines.

Reported, not revised (the brief's stop, "A passage whose new text neither the rule nor the judgement's verdicts settle: the rung reports it and does not choose"):

15. Appendix A, the Fortress calculi, three passages in no inventory (neither the judgement's nor the gatherer's scan reaches them: the calculi are written in math macros, not Fortress text):
    - `Specification/appendices/calculi/where/syntax.tex:82-91` and `where/static.tex:328-342` (Core Fortress with Where Clauses): an object or trait definition may carry where clauses whose variables occur in its supertypes, and the subtyping rule `S-Both` instantiates those variables with witnesses, so a class is below every instantiation its witnesses reach; E2's shape, formalised.
    - `Specification/appendices/calculi/acffd/static.tex:46-89` (the acyclicity rule of the ACFFD calculus): conditions (2) and (3) admit one self-extension whose arguments may be the parameters' own bounds, so `trait T[\X extends N\] extends T[\N\]` is well-formed and `T[\A\]` is below `T[\A\]` and `T[\N\]`; E1's shape at one level.
    - `Specification/appendices/calculi/basic/calculus.tex:16-19`: "all valid Basic Core programs are valid Fortress programs". Basic Core has no exclusion between instantiations; its only multiple-inheritance premise is `oneOwner` (`basic/static.tex:263-272`), so an object extending two instantiations of a generic trait that declares no method is valid Basic Core and, with the rule stated, not valid Fortress.
    What the rule settles is that these programs are refused; it does not settle what the calculi's text becomes (a callout, new premises in the rules, which reopen the soundness claims at `where/static.tex:478-480` and `acffd/static.tex:370-373`, or nothing). So they go to Pavol, and the revival section of Appendix I names them as not yet revised.

Deferred to the flattening rung's batch (`POSITIONS.md:132`; judgement section 3.3):

16. `Specification/basic-lib/basic-integers.tex` (E5: `:28-63`, `:86-97`, `:194-`), `Specification/basic-lib/numbers.tex` (E5: `:36-90`, `:107-113`, `:176-`), `Specification/advanced-lib/numbers-advanced.tex` whole (E6, `RationalQuantity`, `:15-260`). Untouched.

Checked and not on the list:

17. Instantiations that differ only in operator arguments: `Specification/basic-lib/booleans.tex:18-36` (`Boolean`), `:361-374` (`BooleanInterval`), and in `Specification/advanced-lib/algebraic-constraints.tex` the clauses at `:175`, `:296`, `:336`, `:902`, `:935`, `:997`, `:1173`, `:1815`, `:1833`. Not refused: operator arguments do not count (judgement section 4). The rule's sentence says so; nothing else changes.
18. `Specification/appendices/future.tex:127-146`, Maessen's remark that "stuff like Empty" spoils binding a type variable in a `typecase`: stays (judgement section 3.5). `future.tex:212-220`, the proposed `trait Indexed[\I extends Equality\] excludes Indexed[\U\] where [\U\]{I excludes U}`: an `excludes` clause, not an `extends` one; instantiation exclusion already makes two different instantiations exclude each other, so the proposal is subsumed, not contradicted.
19. `Specification/appendices/internal-document.tex:443-480` (`IntegerValue`, `ExtendedIntegerValue`): their supertraits `RationalValue` and `ExtendedRationalValue` are not declared in the passage, so no double instantiation can be read from it.
20. `Specification/basic/traits.tex:18-19`, the note "Covariant list with comprises clause (Victor's email ...)": a pointer to an email, no statement.
21. Where clauses on methods and where clauses constraining a declaration's own static parameters (`Specification/advanced-lib/binary.tex:105-364`, `:1509`; `advanced-lib/algebraic-constraints.tex:502`; `appendices/internal-document.tex:418-440`; `basic/conversions-coercions.tex:213-216`): no where-clause variable in an `extends` clause.
22. `SpecData/examples/`: no `where` clause in any example (grep), so no generated example is edited or reported.
23. `Specification/basic/overloading.tex:100-107`, the sentence that overloads may not differ in static parameters: phase 3 of the plan, left out by name (`explorations/coordinator/CLIMB-BATCH-5.md` section 1, "What the batch leaves out").

The rung's own scan: every `extends` clause in the `%` Fortress source of the 172 tracked `.tex` files outside `library/apis/`, joined over continuation lines, checked for a generic named twice (a script, `probes/scan/dupinst.py`, output `probes/scan/dupinst.txt`); every line carrying both `extends` and `where`, in the `%` source and in the typeset `\KWD{extends}...\KWD{where}` form (`probes/scan/extends-where.txt`); every sentence with "instantiation(s) of", "every instantiation", "multiple instantiation", "two/different/distinct instantiations" (`probes/scan/instantiation-prose.txt`); and a reading of the four calculi of Appendix A, which found item 15.

## 2. The rule as the revision states it

The decisions: route A (`POSITIONS.md:92`); the form, S1, "1, teams' way" (`:109`); the later Types chapter cited beside `Specification/` (`:110`); the per-example verdicts, S2 (`:111-130`); sizes count, "Every static argument counts except operator arguments. Rung S states the rule that way" (`:146`); the one sentence on `covariant` in the callout at the covariance example (`:147`); the number chapters deferred (`:132`); the unrevised copy's name (`:145`).

The rule is stated once, in the two parts of Luchangco's later chapter (`Documentation/Specification/Prose/Language/types.tick:353-377`: the section "should say only which instantiations exclude each other", while the rule proper "is a rule applied to trait declarations"):

- As a property of exclusion, `Specification/basic/types-vals-vars.tex:218-237` (after the edit), beside the exclusion properties of trait types: "Two instantiations of the same parameterized trait exclude each other unless each static argument of one, other than an operator argument, is the same as the corresponding static argument of the other: the same type for a type parameter, and the same value for a `nat`, `int`, `bool`, dimension, or unit parameter. This property is called *instantiation exclusion*." Then why operator arguments do not count (they name the operator a subtrait inherits, `Specification/basic/trait-parameters.tex:223-228`; judgement section 4), and the consequence that no type is below two such instantiations. The section's definition, "the smallest ones that satisfy all the properties given" (`types-vals-vars.tex:185-189`), is unchanged. The name is the later chapter's, "I've shortened this to instantiation exclusion" (`types.tick:354`); the callout names "multiple instantiation exclusion" and the type group's paper (`Papers/Types/exclusion.tick:141-152`; `Papers/Types/paper.tick:213-221`, Allen, Hilburn, Kilpatrick, Luchangco, Ryu, Chase and Steele, OOPSLA 2011).
- As a rule on declarations, `Specification/basic/traits.tex:299-324`, beside the "Not allowed" `InclusiveMolecule`: "a trait or object may not extend two instantiations of one parameterized trait that exclude each other by instantiation exclusion, directly or through its supertraits: any two instantiations of one parameterized trait that it extends must have the same static arguments, operator arguments excepted", with `object Child extends { Parent[\ZZ32\], Parent[\String\] }` as its "Not allowed" example (the internal appendix's own `badChild` shape, `Specification/appendices/internal-document.tex:375`). Luchangco's stronger form, "must extend an expressible instantiation of that generic type that is a subtype of both" (`types.tick:364-367`), is quoted in the callout; with every parameter invariant it is this rule (judgement section 5).

"The same type" is the specification's word for what the later chapter calls "type equivalent" (`types.tick:360`); the specification's subtype relation is antisymmetric (`types-vals-vars.tex:117-120`), so equivalent types are the same type. Dimension and unit arguments count because the decision counts every static argument but operator arguments (`POSITIONS.md:146`); neither path implements them (`Specification/basic/trait-parameters.tex:15-17`).

## 3. Per passage: the original, the new text, the reason, route C

Route C, which each entry refers to, is section 5. Line numbers "after" are of the edited tree on this branch.

### 3.1 Instantiation exclusion (`basic/types-vals-vars.tex`, `basic/traits.tex`)

Original. The draft states no exclusion between instantiations; its relations are the smallest satisfying the properties given:

Base `Specification/basic/types-vals-vars.tex:184-189`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/types-vals-vars.tex:184-189` (the same text, compared by `git hash-object`):

```latex

These relations are defined more precisely
in the following sections describing each kind of type in more detail.
Specifically,
the relations are the smallest ones that satisfy
all the properties given in those sections (and this one).
```

and the properties it gives trait types are these:

Base `Specification/basic/types-vals-vars.tex:208-216`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/types-vals-vars.tex:208-216` (the same text, compared by `git hash-object`):

```latex
A trait type is a subtype of every type
that appears in the \KWD{extends} clause of its definition.
In addition, every trait type is a subtype of \TYP{Any}.

A trait declaration may also include an \KWD{excludes} clause,
in which case the defined trait type
excludes every type that appears in that clause.
Every trait type also excludes every arrow type and every tuple type,
and the special types \TYP{()} and \TYP{BottomType}.
```

Its rule on declarations is that of exclusive traits only:

Base `Specification/basic/traits.tex:218-222`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/traits.tex:218-222` (the same text, compared by `git hash-object`):

```latex
A trait with an \KWD{excludes} clause excludes
every trait listed in its \KWD{excludes} clause.
If a trait \VAR{T} excludes a trait \VAR{U},
the two traits are mutually exclusive:
neither can extend the other, and no trait can extend them both.
```

Base `Specification/basic/traits.tex:284-292`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/traits.tex:284-292` (the same text, compared by `git hash-object`):

```latex
\TYP{OrganicMolecule} and \TYP{InorganicMolecule} exclude each other, even
though only \TYP{OrganicMolecule} has an \KWD{excludes} clause.
For example, the following trait declaration is not allowed:
%(* Not allowed! *)
%trait InclusiveMolecule extends { InorganicMolecule, OrganicMolecule } end
\begin{Fortress}
\(\mathtt{(*}\;\hbox{\rm  Not allowed! \unskip}\;\mathtt{*)}\)\\
\(\KWD{trait} \TYP{InclusiveMolecule} \KWD{extends} \{\,\TYP{InorganicMolecule}, \TYP{OrganicMolecule}\,\} \KWD{end}\)
\end{Fortress}
```

New text: `types-vals-vars.tex:218-237` and its callout `:238-249`; `traits.tex:299-313` and its callout `:314-324` (section 2 quotes both).

Reason: route A keeps the checker's rule (`POSITIONS.md:92`), which the draft never states and which it contradicts by omission (`FACTS.md`, "The compiled checker's exclusion rule is the designers' "multiple instantiation exclusion", relaxing it alone is unsound, and the real fork is the code generator's dispatch of generics": with the rule relaxed, `ProbeMIEPick.fss` type-checks and dies with `IncompatibleClassChangeError`). The verdict is the judgement's section 5, in the later chapter's two-part form (section 12). The rule's example `Child` was run both ways on this branch: the compiled checker refuses it, "Types Parent[\ZZ32\] and Parent[\String\] exclude each other.  Child must not extend them." (`probes/examples/SpecDeclRule.compile.txt:1-2`), and `walk` runs it, `f took a Parent[String]` (`probes/examples/SpecDeclRule.walk.txt:1`), as the judgement measured for `DoubleInstance`. The checker's comparison of sizes is row 402, owed to rung Z of this batch; booleans follow once the checker supports boolean parameters (`POSITIONS.md:146`).

Route C: replaces this rule with the forest rule (section 5).

### 3.2 Where-clause variables in `extends` clauses (`basic/trait-parameters.tex`), and Luchangco's notes (`basic/traits.tex`)

Original. No such sentence. The notes it answers, unchanged by the revision:

Base `Specification/basic/traits.tex:172-197`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/traits.tex:172-197` (the same text, compared by `git hash-object`):

```latex
A trait with an \KWD{extends} clause
\emph{explicitly extends} those traits listed in its \KWD{extends} clause.
\note{
Victor: It is possible for a trait to explicitly extend itself
 using hidden type variables.  In particular, the straightforward
 interpretation of covariant/contravariant declarations has this property.
 (But we could just rule this a special case, since it is special in other
 ways already.)
}
In addition, every trait except \TYP{Any} and \TYP{Object}
implicitly extends the trait \TYP{Object}
if it does not do so explicitly.
We define the extension relation to be the transitive closure
of implicit and
explicit extension.
That is, trait \VAR{T} \emph{extends} trait \VAR{U}
if and only if \VAR{T} explicitly or implicitly
extends \VAR{U} or if there is some trait \VAR{S}
that \VAR{T} explicitly extends and that extends \VAR{U}.
The extension relation induced by a program is the smallest
relation satisfying these conditions.
This relation must form an acyclic hierarchy
rooted at trait \TYP{Object}.
\note{
Victor: Technically, there may be self cycles in explicit extension due to
 hidden type variables, as described above.}
```

New text: `trait-parameters.tex:339-349` (the sentence "A where-clause variable may not appear as a static argument in an extends clause", why, and the callout); `traits.tex:181-185`, a callout after the first note answering both ("so no trait extends itself through a hidden type variable and explicit extension has no self cycles").

Reason: judgement sections 5 and 7 ("one sentence, that a where-clause variable may not appear as a static argument in an extends clause"); the note asked for exactly this ruling ("we could just rule this a special case"), judgement section 3.1, last bullet. The notes are kept, not replaced: they are the team's record of the question. None of the three examples reached the rule before the revision: both paths stop at `T is undefined` (`FACTS.md`, "The specification's own examples that the multiple instantiation exclusion refuses, and which alternatives run on both paths"; `explorations/reviews/spec-refused-examples/captures/SpecCovariant.compile.txt`, `SpecSubtraitOfEvery.compile.txt`, `SpecEmpty.compile.txt`).

Route C: the same under route C, which admits several instantiations only of a self-typed generic along a chain (`explorations/reviews/spec-refused-examples.md:497-502`, inferred there from the forest rule).

### 3.3 The covariance example, E1 (`basic/trait-parameters.tex`)

Original:

Base `Specification/basic/trait-parameters.tex:339-351`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/trait-parameters.tex:339-351` (the same text, compared by `git hash-object`):

```latex
Trait declarations are allowed to extend other instantiations of
themselves. For example, we can write:
%trait C[\S\] extends C[\T\]
%  where {S extends T, T extends Object}
%end
\begin{Fortress}
\(\KWD{trait} C\llbracket{}S\rrbracket \KWD{extends} C\llbracket{}T\rrbracket\)\\
{\tt~~}\pushtabs\=\+\(  \KWD{where} \{S \KWD{extends} T, T \KWD{extends} \TYP{Object}\}\)\-\\\poptabs
\(\KWD{end}\)
\end{Fortress}
In this declaration, for every subtype \VAR{S} of \VAR{T}, \EXP{C\llbracket{}S\rrbracket}
is a subtype of \EXP{C\llbracket{}T\rrbracket}. Effectively, we have expressed
  the fact that the static parameter \VAR{S} of \VAR{C} is covariant.
```

New text: `trait-parameters.tex:351-397`. The declaration kept, with "(* Not allowed! *)" added as the first line of its `%` source and of its typeset block, the typeset lines otherwise byte for byte; the sentence that it would express covariance and is not allowed; "Static parameters are invariant: C[\S\] is a subtype of C[\T\] only if S and T are the same type"; the widening function:

```
trait C[\S\]
  getter item(): S
end
object CItem[\S\](item: S) extends C[\S\] end
widen[\T, S extends T\](c: C[\S\]): C[\T\] = CItem[\T\](c.item)
```

and the callout, whose `covariant` sentence is: "The type group's later design declares variance instead with a covariant modifier on a static parameter (the team's later Types chapter, Luchangco, 2012), which is implemented on neither the interpreter nor the compiled path; the revival's decision record and row 404 of its gap ledger say what is known of it."

Reason: judgement section 3.1, E1, option 1; the library's widening functions (`Library/CovariantCollection.fss:15-36`, `upward[\R, I extends R, T extends R\]` and `opr APPCOV[\T, A extends T, B extends T\]`). The widening example as printed, completed into a program with a `Dog` and an `Animal`, prints `dog` under `walk` and compiled (`probes/examples/SpecWiden.fss`, `.walk.txt`, `.compile.txt`, `.run.txt`); the judgement's `AltCovariantBounded`, with `Any` bounds, does the same (`explorations/reviews/spec-refused-examples/captures/AltCovariantBounded.walk.txt`, `.run.txt`).

The `covariant` keyword, the type group's later direction. The later chapter's prose: "A static parameter of a trait declaration may be declared with the covariant modifier. In this case, it is a covariant parameter of the generic type defined by the trait declaration. One instantiation of a generic type is a subtype of another instantiation of the same generic type if the argument instantiating each covariant parameter in the first instantiation is a subtype of the corresponding argument in the second instantiation, and the argument instantiating each non-covariant parameter is the same in both instantiations." (`types.tick:322-339`, its comment lines left out); and its exclusion between instantiations: "Two instantiations of a generic trait type exclude each other if the corresponding arguments for any covariant parameter exclude each other, or if the corresponding arguments for any non-covariant parameter are not type equivalent." (`types.tick:357-360`). The keyword entered the grammar in `26718e298` (2011-12-06) and subtyping by variance in `20a8febe9` (2012-02-29) (ledger row 404). Today the compiled checker accepts it and the compiled run dies with `IncompatibleClassChangeError`, while `walk` refuses the binding (`explorations/reviews/spec-refused-examples/captures/AltCovariantVariance.compile.txt`, `.run.txt`, `.walk.txt`; row 404). It is the road by which declaration-site variance can return, once both paths carry it to run time (worklist item 12, `POSITIONS.md:131`); the text mentions it in one callout sentence and specifies nothing of it, since it runs on neither path.

Route C: the same under route C (section 3.2).

### 3.4 A subtrait of every instantiation, E2 (`basic/trait-parameters.tex`)

Original:

Base `Specification/basic/trait-parameters.tex:354-380`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/trait-parameters.tex:354-380` (the same text, compared by `git hash-object`):

```latex
Trait declarations need not have any static parameters in order
to have a \KWD{where} clause. For example, the following trait
declaration is legal:
%trait C extends D[\T\]
%  where {T extends Object}
%end
\begin{Fortress}
\(\KWD{trait} C \KWD{extends} D\llbracket{}T\rrbracket\)\\
{\tt~~}\pushtabs\=\+\(  \KWD{where} \{T \KWD{extends} \TYP{Object}\}\)\-\\\poptabs
\(\KWD{end}\)
\end{Fortress}
In this declaration, trait \VAR{C} is a subtrait of \emph{every}
instantiation of parametric trait \VAR{D}. Thus, trait \VAR{C} has all
of the methods of every instantiation of \VAR{D}. By thinking of the
declaration this way, we can see what restrictions we need to impose on
the trait \VAR{C} in order for it to be sensible. If trait
\VAR{C} inherits a method declaration that refers to \VAR{T}, it really
contains infinitely many methods (one for each instantiation of \VAR{T}).
However, instantiations of the \KWD{where}-clause variables are not
explicit from the program text as static parameters are.
It must be possible to infer which method is referred to at the call site.
%%So every method invocation is annotated with static types by type inference.
If there is not enough information to infer which method is called,
type checking rejects the
program and requires more type information from the programmer.
Programmers always can provide more type information by using type
ascription as described in \secref{type-ascription}.
```

New text: `trait-parameters.tex:400-437`. "For example, the following trait declaration is legal:" becomes "But the following trait declaration is not allowed:"; the declaration kept, marked as in 3.3; in the paragraph after it "is a subtrait" becomes "would be a subtrait" and "has all" becomes "would have all", the rest unchanged; a closing sentence, "But trait C would also be a subtype of every pair of different instantiations of D, which exclude each other by instantiation exclusion, so no such restriction makes the declaration sensible: that is why it is not allowed."; and the callout.

Reason: judgement section 3.1, E2, option 1, "kept as the counterexample that introduces the rule". The rule's sentence stands at the head of the section (3.2), which says that this, the second of the three declarations, shows why; the section's order is kept, E1 before E2, rather than moving E2 first (a decision, section 7).

Route C: the same under route C.

### 3.5 The empty list, E3 (`basic/trait-parameters.tex`)

Original:

Base `Specification/basic/trait-parameters.tex:383-399`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/trait-parameters.tex:383-399` (the same text, compared by `git hash-object`):

```latex
Object or functional declarations may include \KWD{where} clauses.
Here is an example declaration of an \TYP{Empty} list:
%object Empty extends List[\T\] where {T extends Object}
%  first() = throw Error
%  rest() = throw Error
%  cons(x) = Cons(x,self)
%  append(xs) = xs
%end
\begin{Fortress}
\(\KWD{object} \TYP{Empty} \KWD{extends} \TYP{List}\llbracket{}T\rrbracket \KWD{where} \{T \KWD{extends} \TYP{Object}\}\)\\
{\tt~~}\pushtabs\=\+\(  \VAR{first}() = \;\KWD{throw} \TYP{Error}\)\\
\(  \VAR{rest}() = \;\KWD{throw} \TYP{Error}\)\\
\(  \VAR{cons}(x) = \TYP{Cons}(x,\KWD{self})\)\\
\(  \VAR{append}(\VAR{xs}) = \VAR{xs}\)\-\\\poptabs
\(\KWD{end}\)
\end{Fortress}
where \TYP{Cons} is declared in \secref{object-decls}.
```

New text: `trait-parameters.tex:440-485`. "Object or functional declarations may include where clauses, under the same restriction. The following declaration of an Empty list is not allowed:"; the declaration kept, marked; then "Instead, the empty list is one object for each element type, and each use writes the element type, as in Empty[\ZZ32\]:"

```
object Empty[\T\] extends List[\T\]
  first(): T = throw NotFound
  rest(): List[\T\] = throw NotFound
  cons(x: T): List[\T\] = Cons[\T\](x, self)
  append(xs: List[\T\]): List[\T\] = xs
end
```

"The library declares its empty collections and its empty optional value (Section 39.2) the same way."; and the callout.

Reason: judgement section 3.1, E3, option 1; the library's `object Empty[\T\] extends {AnyEmpty, CovariantCollection[\T\] }` (`Library/CovariantCollection.fss:96`) and `emptyList[\E\]()` (`Library/List.fsi:121`). The header is the verdict's. The bodies depart from the original's in three ways, each so that the example as printed runs on both paths (a decision, section 7):
- `Cons[\T\](x, self)` for `Cons(x,self)`: the verdict commits to the static argument written at each use until static-argument inference exists (judgement section 3.1, E3; `AltEmptyParamBare`), and a call of a generic object's constructor is such a use.
- Parameter and return types written, as the chapter's own `List` declares them (`SpecData/examples/basic/StatParam.Type.fss`): with the original's untyped `cons(x)` and `append(xs)` the compiled checker refuses the object, "Missing parameter type for x", and `walk` fails at the first call of `cons` with an `InterpreterBug`, "MethodClosure cons(_:T):List[\T\] ... has neither body nor def instanceof Method" (`probes/examples/SpecEmptyUntyped.fss`, `.compile.txt`, `.walk.txt`). That is the original's body style, not the rule; section 3.10 gives it its home.
- `throw NotFound` for `throw Error`: neither library declares an `Error` (grep of `Library/` and `ProjectFortress/LibraryBuiltin/`), and `NotFound` is declared by both (`Library/FortressLibrary.fsi:1001`, `Library/CompilerLibrary.fsi:87`) and named by the specification (`Specification/basic/expressions/aggregate.tex:95`).
The example completed into a program (the chapter's `List` with a `size()` added to print, a `Cons` with its fields renamed `hd` and `tl` so that they do not shadow `first()` and `rest()`) prints `2` and `0` under `walk` and compiled (`probes/examples/SpecEmptyTyped.fss`, `.walk.txt`, `.compile.txt`, `.run.txt`); the judgement's `AltEmptyParam` prints `1` and `0` on both paths (`explorations/reviews/spec-refused-examples/captures/AltEmptyParam.walk.txt`, `.run.txt`).

Route C: the same under route C.

### 3.6 The empty optional value, E4 (`basic-lib/convenience.tex`, `basic/exceptions.tex`, `basic-lib/exception.tex`)

Original:

Base `Specification/basic-lib/convenience.tex:34-53`; the Working Draft of February 2011, `Specification-1.0-frozen/basic-lib/convenience.tex:34-53` (the same text, compared by `git hash-object`):

```latex
An optional value \VAR{v} is either \TYP{Nothing} or
\EXP{\TYP{Just}(v)} declared as follows:
%(* Optional Values *)
%trait Maybe[\T\] comprises { Nothing, Just[\T\] }
%  isNothing: Boolean
%end
%object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}
%end
%object Just[\T\](just: T) extends Maybe[\T\]
%end
\begin{Fortress}
\(\mathtt{(*}\;\hbox{\rm  Optional Values \unskip}\;\mathtt{*)}\)\\
\(\KWD{trait} \TYP{Maybe}\llbracket{}T\rrbracket \KWD{comprises} \{\,\TYP{Nothing}, \TYP{Just}\llbracket{}T\rrbracket\,\}\)\\
{\tt~~}\pushtabs\=\+\(  \VAR{isNothing}\COLON \TYP{Boolean}\)\-\\\poptabs
\(\KWD{end}\)\\
\(\KWD{object} \TYP{Nothing} \KWD{extends} \TYP{Maybe}\llbracket{}T\rrbracket \KWD{excludes} \TYP{Just}\llbracket{}T\rrbracket \KWD{where} \{T \KWD{extends} \TYP{Object}\}\)\\
\(\KWD{end}\)\\
\(\KWD{object} \TYP{Just}\llbracket{}T\rrbracket(\VAR{just}\COLON T) \KWD{extends} \TYP{Maybe}\llbracket{}T\rrbracket\)\\
\(\KWD{end}\)
\end{Fortress}
```

Base `Specification/basic/exceptions.tex:111-130`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/exceptions.tex:111-130` (the same text, compared by `git hash-object`):

```latex
Every exception has optional fields: a message and a chained exception.
These fields are default to \TYP{Nothing} as follows:
%trait Exception comprises { CheckedException, UncheckedException }
%  getter message(): Maybe[\String\] = Nothing
%  setter message(Maybe[\String\]):()
%  getter chain(): Maybe[\Exception\] = Nothing
%  setter chain(Maybe[\Exception)\]:()
%  printStackTrace(): ()
%end
\begin{Fortress}
\(\KWD{trait} \TYP{Exception} \KWD{comprises} \{\,\TYP{CheckedException}, \TYP{UncheckedException}\,\}\)\\
{\tt~~}\pushtabs\=\+\(  \KWD{getter} \VAR{message}()\COLON \TYP{Maybe}\llbracket\TYP{String}\rrbracket = \TYP{Nothing}\)\\
\(  \KWD{setter} \VAR{message}(\TYP{Maybe}\llbracket\TYP{String}\rrbracket)\COLONOP()\)\\
\(  \KWD{getter} \VAR{chain}()\COLON \TYP{Maybe}\llbracket\TYP{Exception}\rrbracket = \TYP{Nothing}\)\\
\(  \KWD{setter} \VAR{chain}(\TYP{Maybe}\llbracket\TYP{Exception}\rrbracket)\COLONOP()\)\\
\(  \VAR{printStackTrace}()\COLON ()\)\-\\\poptabs
\(\KWD{end}\)
\end{Fortress}
where an optional value \VAR{v} is either \TYP{Nothing} or
\EXP{\TYP{Just}(v)}.
```

Base `Specification/basic-lib/exception.tex:21-24`; the Working Draft of February 2011, `Specification-1.0-frozen/basic-lib/exception.tex:21-24` (the same text, compared by `git hash-object`):

```latex
Every exception has optional fields: a message and a chained exception.
These fields are default to \TYP{Nothing}
where an optional value \VAR{v} is either \TYP{Nothing} or
\EXP{\TYP{Just}(v)} as declared in \secref{convenience-types}.
```

New text: `convenience.tex:34-79`: "An optional value v of type Maybe[\T\] is either Nothing[\T\] or Just(v) declared as follows:"

```
(* Optional Values *)
trait Maybe[\T\] comprises { Nothing[\T\], Just[\T\] }
  isNothing: Boolean
end
value object Nothing[\T\] extends Maybe[\T\]
end
object Just[\T\](just: T) extends Maybe[\T\]
end
```

then the original declaration of `Nothing`, marked "Not allowed", with why (the rule, and the `excludes` clause the grammar gives no object, `Specification/basic/objects.tex:84-86`, redundant by `Specification/basic/types-vals-vars.tex:254-257` after the edit, `:221-224` at the base), and the callout. `exceptions.tex:111-137`: the defaults `Nothing[\String\]` and `Nothing[\Exception\]`, edited by hand in the typeset block so that the `%` source's typo `Maybe[\Exception)\]`, which the typeset line does not have, is not regenerated into it; the sentence on optional values as in `convenience.tex`; the callout. `exception.tex:21-29`: the same.

Reason: judgement section 3.2, option 1; row 331's decision of 2026-09-21, `Nothing[\T\]` stays; the library's `value object Nothing[\T\] extends Maybe[\T\]` (`Library/FortressLibrary.fsi:862-864`, with its comment "%Nothing% will become a non-parametric singleton when we get where clauses working", which the callout quotes). `Just` is left as the draft had it, `object Just[\T\](just: T)`, since the verdict changes `Nothing` only; the library's is `value object Just[\T\](x:T)` (`Library/FortressLibrary.fsi:840`). The shape, a parametric object with its argument written at each use, runs on both paths (`AltEmptyParam`; and the example's own shape under other names, `probes/examples/SpecNothingT.fss` and its captures). The one library's `Nothing[\String\]` itself runs under `walk` and not on the compiled path, whose prelude declares a marker `Nothing` with a coercion (`Library/CompilerLibrary.fsi:223-236`), refusing `Nothing[\String\]` ("Unexpected type for a singleton object reference", row 331); `probes/examples/SpecNothingLib.fss` and its captures record it on this branch. That is row 331 as it stands, closed by the switch-over to the one library; the specification now describes the library row 331 kept.

Route C: the same under route C.

### 3.7 The root's algebra, E7 (`basic-lib/objects.tex`)

Original:

Base `Specification/basic-lib/objects.tex:80-84`; the Working Draft of February 2011, `Specification-1.0-frozen/basic-lib/objects.tex:78-82` (the same text, compared by `git hash-object`):

```latex
The infix operator \EXP{\sequiv} (object equivalence) is used to
decide whether two objects are ``the same object'' in the strictest
sense possible; this is described in detail in \secref{equivalence}.
Note that the properties of trait \TYP{Any} assert that \EXP{\sequiv}
is an equivalence relation.  In \TYP{Object} this property is asserted abstractly using the algebraic constraints of \chapref{lib:algebraic-constraints}.
```

Base `Specification/basic-lib/objects.tex:127-141`; the Working Draft of February 2011, `Specification-1.0-frozen/basic-lib/objects.tex:125-139` (the same text, compared by `git hash-object`):

```latex
The trait \TYP{Object} is the root of the type hierarchy for all
user-constructed objects and functions.
The \TYP{Object} type does not
have any additional methods, but uses algebraic constraints (see
\chapref{lib:algebraic-constraints}) to describe the properties of the
existing operators more abstractly.

%trait Object extends { Any, EquivalenceRelation[\Object,===\], IdentityOperator[\Object\] }
%    excludes { Tuple }
%end
\begin{Fortress}
\(\KWD{trait}\mskip 4mu plus 4mu\TYP{Object} \KWD{extends} \{\,\TYP{Any}, \TYP{EquivalenceRelation}\llbracket\TYP{Object},\sequiv\rrbracket, \TYP{IdentityOperator}\llbracket\TYP{Object}\rrbracket\,\}\)\\
{\tt~~~~}\pushtabs\=\+\(    \KWD{excludes} \{\,\TYP{Tuple}\,\}\)\-\\\poptabs
\(\KWD{end}\)
\end{Fortress}
```

Base `Specification/basic-lib/objects.tex:144-158`; the Working Draft of February 2011, `Specification-1.0-frozen/basic-lib/objects.tex:142-156` (the same text, compared by `git hash-object`):

```latex
\Trait{Fortress.Core.Tuple}
\seclabel{core-tuple}

The trait \TYP{Tuple} is the root of the type hierarchy for all tuple types (see \secref{tuple-types}).  No user-defined object can be a subtype of \TYP{Tuple}.  As with the type \TYP{Object}, the type \TYP{Tuple} uses algebraic constraints to describe its existing methods.

%trait Tuple extends { Any, EquivalenceRelation[\Tuple,===\], IdentityOperator[\Tuple\] }
%    excludes { Object }
%  toString(): String
%end
\begin{Fortress}
\(\KWD{trait}\mskip 4mu plus 4mu\TYP{Tuple} \KWD{extends} \{\,\TYP{Any}, \TYP{EquivalenceRelation}\llbracket\TYP{Tuple},\sequiv\rrbracket, \TYP{IdentityOperator}\llbracket\TYP{Tuple}\rrbracket\,\}\)\\
{\tt~~~~}\pushtabs\=\+\(    \KWD{excludes} \{\,\TYP{Object}\,\}\)\-\\\poptabs
{\tt~~}\pushtabs\=\+\(  \VAR{toString}()\COLON \TYP{String}\)\-\\\poptabs
\(\KWD{end}\)
\end{Fortress}
```

New text: `objects.tex:83-88` (the sentence "In Object this property is asserted abstractly ..." removed, a callout in its place); `objects.tex:127-172`: "The Object type does not have any additional methods; the properties of the existing operators, such as ===, are those stated in trait Any", `trait Object extends Any excludes { Tuple } end`, the original declaration kept, marked "Not allowed", with why, and the callout; `objects.tex:174-194`: `trait Tuple extends Any excludes { Object } toString(): String end`, its sentence "As with the type Object, the properties of its existing operators are those stated in trait Any", and a callout. `Tuple`'s original is not kept as "Not allowed", since the rule does not refuse it (judgement section 3.4); it is quoted here and in Appendix I.

Reason: judgement section 3.4, option 1. Every trait but `Any` and `Object` extends `Object` (`Specification/basic/traits.tex:181-183` at the base), and `Commutative[\T, ODOT\]` extends `EquivalenceRelation[\T,=\]` (`Specification/advanced-lib/algebraic-constraints.tex:666-667`), reached from `CommutativeRing` through `CommutativeMonoid` (`:1378-1380`, `:1580-1584`), so every commutative algebraic type would be an `EquivalenceRelation` at `Object` and at itself. The library's `trait Object extends Any` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:32`) and its `opr SEQV(a:Any, b:Any)` (`Library/FortressLibrary.fsi:2474`); the specification's `Any` already declares `opr ===(self, other: Any)` with the equivalence properties (`Specification/basic-lib/objects.tex:24-57`), so `===` is an operator on `Any` with no new text. The `excludes` clauses are kept: the verdict removes the algebraic supertraits only. By reading, not run (the judgement ran the shape as `NestedTower`).

The sentence at `:83-84` of the base is not in the judgement's inventory; this rung's scan found it (item 13 of the list), and it follows item 11's verdict because it states the removed clause in prose.

Route C: by the gatherer's reading, not measured, the root's algebra is one of the two passages that would read differently under route C, the tower the other (`explorations/reviews/spec-refused-examples.md:497-502`; judgement section 7). The original text above is route C's text for it.

### 3.8 The internal appendix, E8, E9, E10 (`appendices/internal-document.tex`)

Original: unchanged; the passages are `:305-360`, `:363-414` and `:483-509` at the base and in the frozen copy.

New text: one callout after each, `internal-document.tex:361-366`, `:421-426`, `:522-527`: E8's premise is not allowed, so the disjunction does not arise for this program; E9 is the case instantiation exclusion answers; E10 is not allowed for the reason the covariance example is not, its `extends` clause naming `RationalQuantity` with where-clause variables as static arguments, and the number chapters describing the same design are not yet revised.

Reason: judgement section 3.5. E10's sentence leans on the where-clause variables, not on a comparison of booleans the checker does not make (judgement section 10).

Route C: the same under route C.

### 3.9 The form: the callout, Appendix I, the front matter, the title page

- The callout: `\revision{label}{text}` (`Specification/fortress/fortress.tex:76-92`), an `mdframed` box with a blue left bar and the small-capitals head "Revised by the 2026 revival" and "see Section I.1.n", defined outside `\ifrelease` so that it prints in both builds; the team's `\note` is empty in a release build and reads as the authors' own (`fortress.tex:35-36`, `:58-62`). Sixteen callouts.
- Appendix I: `Specification/appendices/changes.tex:18-414`, a section "Changes Made by the 2026 Revival to the Working Draft" with one subsection per change, each with the affected sections, the change, the rationale, the effect, the original text (the prose quoted, the declarations kept in the body marked "Not allowed", `Tuple`'s declaration quoted) with its path and line in `Specification-1.0-frozen/`, and route C; the directory's misleading name said once (`:38-40`); the passages not yet revised (`:360-384`); route C (`:386-413`).
- The front matter: `Specification/fortress/preamble.tex:54-63`, one paragraph in the first figure.
- The title page: `Specification/fortress/fortress.tex:136`, a line after the draft's date, printed in both builds: "with the changes of the 2026 revival, listed in Appendix I". Original:

Base `Specification/fortress/fortress.tex:110-117`; the Working Draft of February 2011, `Specification-1.0-frozen/fortress/fortress.tex:84-91` (not the same: the revival changed this block, the date line in `414b790e3`; the frozen copy is quoted):

```latex
\title{{\huge The Fortress Language Specification}
\\[1em] {\fbox{\LARGE\it Working Draft}}
\ifrelease
\\ {\large Version 1.0}
\else
\\ {\normalsize SVN \svnrevision --- \today}
\fi
}
```

### 3.10 Met on the way: an untyped parameter in a method that implements an abstract one

The original `Empty`'s bodies, `cons(x) = ...` and `append(xs) = xs` implementing `List[\T\]`'s `cons(T): List[\T\]` and `append(List[\T\]): List[\T\]`, are refused by both paths under the new header: compiled, "Missing parameter type for x"; under `walk`, the program starts and the first call of `cons` on an `Empty[\ZZ32\]` stops with an `InterpreterBug`, "MethodClosure cons(_:T):List[\T\] ... has neither body nor def instanceof Method" (`probes/examples/SpecEmptyUntyped.fss`, `.compile.txt`, `.walk.txt`). The specification allows a parameter "without a declared type" (`Specification/basic/functions.tex:134-143`), the objects chapter's own `Cons` writes its methods so (`cons(x) = Cons(x,self)`, `SpecData/examples/basic/Object.Decl.Cons.fss`, rendered at `Specification/basic/objects.tex:224-226`), and the front matter says the specification's code was tested by executing it (`Specification/fortress/preamble.tex:27-28`); and an object must define every abstract method it inherits, whose declaration may not omit parameter types (`Specification/basic/traits.tex:509-514` at the base); but no sentence says that an untyped parameter of the defining method takes the abstract declaration's type (the overriding rules, `:516-535` at the base and `:548-567` after the edit, are silent on it, and the inference chapter is a stub, ledger row 21). The specification is silent, so the home is 3: the probe and its captures, committed, and a ledger row (`record.md`, provisional row 405). `walk`'s `InterpreterBug` is an internal error whatever the answer. Not traced: where either path would take the type from.

## 4. Not revised by this rung

### 4.1 The number chapters, deferred

`Specification/basic-lib/basic-integers.tex`, `Specification/basic-lib/numbers.tex` and `Specification/advanced-lib/numbers-advanced.tex` are untouched (`POSITIONS.md:132`; judgement section 3.3). They change with the flattening rung, never earlier, because a specification that runs ahead of the library is as much an open discrepancy as one that lags it. Until then the revised rule refuses the nested tower those chapters describe, as the checker refuses the library's (`FACTS.md`, "The compiled checker's exclusion rule is the designers' "multiple instantiation exclusion" ..."); Appendix I says so (`changes.tex:363-374`). Their text as it stands is route C's text for the tower. `RationalQuantity` is a question for the flattening rung's brief (`explorations/coordinator/PLAN.md:79`).

### 4.2 The calculi of Appendix A, reported for Pavol

Item 15 of the list. The rule settles that the programs these calculi admit are refused; it does not settle what their text becomes, and the brief's stop reserves that choice ("A passage whose new text neither the rule nor the judgement's verdicts settle: the rung reports it and does not choose"). The candidates, none taken:

1. A callout at each calculus, the internal appendix's treatment (judgement section 3.5): the calculus predates the rule and admits the shapes named; the rules untouched. Costs three callouts and an Appendix I entry.
2. New premises in the rules: Core Fortress with Where Clauses restricting a supertype to the declaration's own static parameters, ACFFD dropping its self-extension conditions (2) and (3), Basic Core adding the rule to `oneOwner` or beside it. That is new formal text, and it reopens the soundness claims (`where/static.tex:478-480`, `acffd/static.tex:370-373`), which were proved for the rules as written.
3. Nothing, the Appendix I section naming them as not revised, which is what this rung leaves.

The rung's reading, not a decision: 1, since the calculi are the team's formal record of the draft as it stood and route A changes the language, not the history of its formalisation; and 2 is new formal design that no decision covers. The Appendix I section says the calculi "predate the rule and are not yet revised" and that how they are to be revised "awaits a decision of the revival" (`changes.tex:376-384`), so the discrepancy is stated in the document rather than silent (a decision, section 7).

## 5. Route C, the way back

Route C is the forest rule of the team's 2012 patent applications (US 8,843,887 col. 8 l. 8-12, US 8,898,632 col. 8 l. 23-27; Chase, Steele, Naden, Hilburn, Luchangco, filed 2012-08-31): a self-typed generic may be carried at several instantiations that form a chain. Its measured state (`FACTS.md`, "Route C built whole as a shadow: the forest rule closes the specialisation hole only with a return-type rule over every level of a chain, and switching to C costs more than the record said"; `explorations/reviews/mie-probes/route-c-experiment.md`, patches and captures under `explorations/reviews/mie-probes/route-c/`): C-full is 5 files and 188 code lines (the forest with the library's F-bound taken as self-typed, the covariant reading, a return-type rule with one instance per level of a chain, and the call-site fix); the three hole probes are refused at compile time instead of dying with `IncompatibleClassChangeError`; all 43 generic-overload compiler tests print the same; the gate was not run. Its cost, as corrected on 2026-09-24: switching later needs the call-site fix, a per-level method in the code generator (a chain with no specialisation dies with `AbstractMethodError`), interpreter work, a way past the checker's overflow on `comprises T` (`Formula.scala:185-205`), and seven library declarations, on top of un-flattening the tower. C's checker half is additive and inert beside route A (`route-c/flat-count.txt`).

What reversing to route C would do to this revision: the rule's two sentences (3.1) are replaced by the forest rule; the where-clause examples (3.2 to 3.5) and `Nothing` (3.6) stay refused, since none is a chain of a self-typed generic; `Object`'s original clause (3.7) and the number chapters (4.1) would read differently, by the gatherer's reading, and their original text is kept in this record, in Appendix I and in the frozen copy. Nothing of this revision needs undoing for route C's checker half to be probed as a shadow.

## 6. The correction of `CLIMB-BATCH-4.md`, question 2, option (b)

`explorations/coordinator/CLIMB-BATCH-4.md` section 1, question 2, option (b) (`:20`) said of a plain `Nothing` converting to any `Maybe` by `coerce` that "by reading, the interpreter can run [it] once rung C lands". It cannot: rung C landed and `walk` refuses it, because a coercion declared in a generic trait is not applied under `walk` (ledger row 389; `explorations/reviews/spec-refused-examples/captures/AltEmptyCoerce.walk.txt`; `FACTS.md`, "The compiled checker's exclusion rule compares type arguments only, and its abstract-method check does not substitute an operator argument"). The coordinator's note at `CLIMB-BATCH-4.md:20` (`2c948a106`) records it; the revision takes the verdict of judgement section 3.2 option 1, which does not depend on it.

## 7. Decisions taken inside the rung

- The callout macro's name, `\revision`, and look: a blue left bar on a pale blue ground, serif body, head in small capitals with the Appendix I subsection. Alternative: the draft notes' rust style with another label, rejected because the two must be told apart at a glance (the brief's reason for a new macro).
- The title-page line, "with the changes of the 2026 revival, listed in Appendix I", added after the date so that it prints in both builds. Alternative: rewriting the draft's date line, which prints only in a draft build.
- The front-matter paragraph's wording (`preamble.tex:54-63`).
- The originals kept in the body as "Not allowed" are the refused declarations only (E1, E2, E3, `Nothing`, `Object`); the exception defaults, `Tuple` and the prose sentences are rewritten in place and their originals quoted in Appendix I and here. Alternative: every original in the body, which would print the whole `Exception` trait twice and mark as "Not allowed" a `Tuple` declaration the rule does not refuse.
- For the kept originals, the "(* Not allowed! *)" line added to the team's `%` source and typeset block by hand, their other typeset lines left byte for byte; new blocks generated from their `%` source by the team's `fortify` command (`Fortify/fortify.el`, `fortify` with a region, as `Fortify/fortify-doc.txt:146-172` gives the procedure), through a batch driver kept in `tmp/` and not committed. Today's `fortify.el` writes `\KWD{trait}\:\TYP{...}` where the 2009 blocks have `\KWD{trait} \TYP{...}`, so new blocks are a thin space wider after a keyword; accepted, as the tool's output.
- Luchangco's two notes kept and answered by a callout, not replaced (judgement section 5 offered either).
- The where-clause section's order kept (E1, E2, E3), the rule's sentence at its head pointing to E2 as the reason, rather than moving E2 first.
- The new `Empty[\T\]`'s bodies (3.5): the static argument written in `Cons[\T\](x, self)`, the parameter and return types written, and `throw NotFound` for the undeclared `Error`, so that the example as printed runs on both paths. Alternative: the draft's bodies under the new header, which both paths refuse (`probes/examples/SpecEmptyUntyped.*.txt`).
- The size-exclusion effect stated by the ledger row (row 402) rather than as done or not done, so that the text is true whether or not rung Z lands.
- The calculi named in Appendix I as not yet revised (4.2). Alternative: silence until Pavol decides.

## 8. How it was checked

No test can go red for a prose edit; the precedent is batch 3's comment-only rung (`explorations/coordinator/CLIMB-BATCH-3.md:114`). The checks the entries above rest on:

- The builds (`Specification/fortress/README:5-14`; `./ant genSource` then `./ant tex` in `Specification/fortress/`, `FORTRESS_HOME` the worktree): at `6030e4b36` both pass, 49 s and 40 s, 600 pages (`probes/build/base-genSource.txt`, `probes/build/base-tex.txt`); with the edits both pass, 54 s and 38 s, 610 pages, no undefined or multiply defined reference (`probes/build/edit-genSource.txt`, `probes/build/edit-tex.txt`). Machine, from each log's first line: 4 CPUs, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`, load averages 1.87 to 8.18 at the starts. Neither build changed a tracked file. The edited build's PDF is `Specification/fortress.pdf`.
- The text (`probes/build/norm.sh` removes page numbers, dot leaders and blank lines): base against edited, 29 hunks, each a revised passage, a callout, the appendix section and its two contents lines, the front matter or the title line (`probes/build/base-vs-edit-pdftotext-diff.txt`); the committed PDF of 2026-08-23 against the base build, 42 hunks, 40 inside Part IV, which `genSource` renders from the library's `.fsi` files that 15 commits changed since, and one margin note extracted in another place (`probes/build/committed-vs-base-pdftotext-diff.txt`), so this container renders the hand-written sources as that one did.
- The new examples, completed into programs and run under `walk` and compiled (`probes/examples/run.sh`, adapted from `explorations/reviews/spec-refused-examples/run.sh`): the rule's `Child` is refused compiled and run by `walk` (`SpecDeclRule`); the widening function prints `dog` on both (`SpecWiden`); `Empty[\T\]` as printed prints `2` and `0` on both (`SpecEmptyTyped`), and with the draft's untyped bodies both refuse it (`SpecEmptyUntyped`, section 3.10); the `Nothing[\T\]` shape under other names prints `true` and `false` on both (`SpecNothingT`); the one library's `Nothing[\String\]` prints `false` under `walk` and the compiled prelude refuses it (`SpecNothingLib`, row 331). Each program is under `probes/examples/` with its `.walk.txt`, `.compile.txt` and, where it compiled, `.run.txt`.
