<!-- The 2012 patents' "Self-types meet" rule, read from the patents and tested against the library, 2026-09-23, by a delegated worker on main (e1a4461fb when the checker count ran), JDK 25. Patent text: OCR of USPTO's page images (tesseract), line numbers read off the printed gutter numbers. Measurements: forest/forest-run.sh (shadow forest/forest.patch, private caches outside the repository, no tracked file modified). Captures: forest/*.txt. -->

# The 2012 patents' forest rule for self-typed instantiations

Terms as in `../multiple-instantiation-exclusion.md`. "Self-typed generic" is the patents' term, defined in § 1.

## 1. The rule, verbatim and explained

Sources: US 8,843,887 B2 (Chase, Steele, Naden, Hilburn, Luchangco; filed 2012-08-31, granted 2014-09-23) and US 8,898,632 B2 (Naden, Hilburn, Chase, Steele, Luchangco, Allen; filed 2012-08-31, granted 2014-11-25), from https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/8843887 and `…/8898632`. The PDFs are scans; the text below is OCR, with the one unclear line (the invariant clause) checked on a 300 dpi crop. Both patents print the same passages. Citations are to 8,843,887, with 8,898,632 in brackets.

- **The definition** (col. 6 l. 41-55 [col. 6 l. 46-60]): "A particular idiom used in Fortress is the "self-typed generic," where a generic in T also comprises exactly T. This usually corresponds to a property of a binary operator method such as "Comparable" or "AssociativePlus": `trait Comparable[\T\] comprises T  opr < (self, other:T)  end` … Because the only subtype of Comparable[\T\] is T, the two types include exactly the same sets of values, and are in some sense the same type."
- **Meet** (col. 6 l. 58-67): types should "form a lattice, not just a partial order … This requires union and intersection types to ensure that join and meet operations are defined, plus a "bottom" type. … When two types exclude each other, their meet is bottom."
- **The restrictions** open "Restrictions on Fortress types include the following:" (col. 7 l. 40 [col. 7 l. 53]). Three passages matter:
  - "Minimal instance of generic ancestors: If S<:G[\T⃗\], then there exists U⃗ such that for all T⃗ where S<:G[\T⃗\]: if G's ith static parameter is invariant, then Ui=Ti. if G's ith static parameter is covariant, then Ui<:Ti. if G's ith static parameter is contravariant, then Ti<:Ui. G[\U⃗\] is the minimal instance of G that S extends." (col. 7 l. 46-51 [col. 7 l. 60-66]). Its invariant line is the multiple instantiation exclusion.
  - "Self-typed constraints are an exception to this rule; it is permitted to declare that T1<:SomeSelfType[T1]. Because of the different subtyping structure of self-types, this is really more of an equality constraint than an inequality constraint." (col. 8 l. 3-7 [col. 8 l. 18-22]; "this rule" is the order in which constraints are written.)
  - "Self-types meet: if T<:U=S[\U\] and T<:V=S[\V\] then T<:S[\meet(U, V)\] and meet(U, V) must be a declared (not intersection) type. In practice, this means that the instantiations of a particular self-typed generic must form a forest." (col. 8 l. 8-12 [col. 8 l. 23-27]).
- **What uses it.** Dispatch tests the implementations in "most-to-least specific order … until a match is found" (col. 9 l. 8-11). The applicable one provides "bindings … for any static type parameters" from the arguments' dynamic types (col. 9 l. 30-32). Its `match` step looks for the argument type's instance of a generic: "if ∃ M, A <: M, stem(M) = G, M is minimal then …" (col. 10 l. 16-17). Inference then lifts the lower bound: "else if there are self-type constraints t <: Si[\t\] then search for t' above l such that t' <: Si[\t'\] for all Si; if t' exists then l ← t' else dispatch fails" (col. 12 l. 4-7; prose at l. 33-39).

What the words mean:
- **Self-typed.** `S[\T\] comprises T`: the instance at T holds exactly T's values. So `S[\U\] <: S[\V\]` whenever `U <: V`, and a self-typed generic behaves as if covariant although nothing declares it so ("the different subtyping structure"). The covariant line of "Minimal instance" then applies to it, and "Self-types meet" is that line plus the demand that the minimal instance have a name. The patents do not say how the two clauses combine; this reading is ours.
- **Meet.** The greatest common subtype. For two ordered types it is the lower one; for two unrelated types it is an intersection type, or Bottom when they exclude. "Declared (not intersection)" asks for a named type.
- **Forest.** Link each self-typed instantiation to the next wider one a type carries. A forest has no node with two unrelated parents, so each type's instantiations of one self-typed generic form a chain with a least element. That least element is the "minimal instance" the `match` step needs.
- **`comprises T`** is the test for being self-typed. Without it, `S[\ZZ32\]` and `S[\ZZ64\]` are two invariant instances, and the invariant clause forbids having both.

In plain words:
1. Blanket exclusion forbids a type to be two instantiations of one generic: `ZZ32` may not be both `Equality[\ZZ32\]` and `Equality[\ZZ64\]`.
2. The forest rule makes one exception: generics that comprise exactly their parameter (`Equality[\T\] comprises T`), whose instance at a type is that type.
3. For those, a type may carry several instantiations when they line up by subtyping. `ZZ32` may be `Equality` at `ZZ32`, `ZZ64`, `ZZ`, `QQ` and `Number`, because `ZZ32 <: ZZ64 <: ZZ <: QQ <: Number`.
4. The lowest of them is unique. Run-time dispatch binds the parameter to it: `ZZ32` for a `ZZ32` value.
5. Still forbidden: two unrelated instantiations of a self-typed generic, such as one type carrying `Equality[\ZZ64\]` and `Equality[\NN64\]`, unless a declared type below both is also carried.
6. Still forbidden: two instantiations of a generic that is not self-typed. `BadList extends { List[\String\], List[\ZZ\] }` stays illegal, so Naden's `tail[\X\]` beside `tail(x: List[\ZZ\])` keeps its guarantee.
7. `Both extends { Tag[\String\], Tag[\ZZ32\] }` (`ProbeMIEPick`) stays illegal twice over: `Tag` is not self-typed, and `String` and `ZZ32` are unrelated.

## 2. The library's tower under it

Measured with a shadow checker whose `checkP`, asked whether two types exclude, lets two instantiations of a self-typed generic exclude only when their arguments are unordered (§ 4). "Self-typed" there is the library's spelling (the parameter bounded by the generic at itself, `Equality[\T extends Equality[\T\]\]`) or the patents' (`comprises` exactly the parameter). On the interpreter's library the count falls from 103 to 37 (`forest/checker-count.txt:1-5`). By family, with the chains each declaration carries (all follow declared subtyping):
- **Tower, 13 declarations, 31 errors: all lifted.** `Number` is `StandardPartialOrder` and `StandardMinMax` at `Number`, and through them `Equality`, `StandardMin` and `StandardMax` (`Library/FortressLibrary.fsi:276-278`). `QQ` adds `StandardPartialOrder[\QQ\]` (`:373`). `Integral[\I\]` adds `StandardTotalOrder[\I\]` and its parents at `I` (`:412`). So `ZZ32`'s `Equality` chain is `ZZ32 <: ZZ64 <: ZZ <: QQ <: Number` and its `Integral` chain `ZZ32 <: ZZ64 <: ZZ`. `NN32`'s are `NN32 <: NN64 <: ZZ <: QQ <: Number` and, for `Integral`, `NN64 <: ZZ`: `NN32` is `StandardTotalOrder[\NN32\]` but not `Integral[\NN32\]` (`FortressBuiltin.fsi:82`). `Integral`'s own clash, `StandardPartialOrder` at `I` and at `QQ`, is ordered through the bound, `I <: Integral[\I\] <: AnyIntegral <: QQ`. `Int`, `Long`, `UnsignedLong`, `IntLiteral` and `BigNum` inherit a parent's chains.
- **Comparisons, 4 declarations, 7 errors: lifted.** `TotalComparison` is `Equality` and `StandardPartialOrder` at itself and at `Comparison` (`:100-101`, `:120-121`), and `TotalComparison <: Comparison`. The three objects inherit.
- **`Maybe`, 4 declarations, 10 errors: lifted.** `AnyMaybe` is `Equality` at itself and at `AnyUniqueItem` (`:817`, `:886`), and it extends `AnyUniqueItem` in the same clause. `Maybe[\T\]`, `Just` and `Nothing` inherit.
- **Reductions, 2 declarations, 13 errors: kept.** `DistributesOver[\E\]` (`:1775`) has no bound and no methods, so it is not self-typed, and its arguments `MaxReductionN`, `MinReductionN` and `SumReduction` are unrelated objects. The rule does not reach these markers. They need another encoding, one marker trait per fact, or route C's per-trait exemption. Covariance would not help, since the three have no common subtype. The only reader of the marker is inside a comment (`Library/Generator2.fss:59-68`).

So 48 of the 61 errors go and the 13 marker errors stay (`forest/checker-count.txt`, from line 6: the errors that go and the one that appears). The other change in the count, in `RangeInternals`, is in § 4. `sites.tsv`'s line numbers are from an older revision of the `.fsi`; the ones above are today's.

**Under the patents' own test nothing is lifted.** Mode `comprises` counts 103: no trait in the library comprises its parameter. To pass that test, the seven traits need the clause, in the `.fsi` and the `.fss`:

    trait Equality[\T extends Equality[\T\]\] comprises T
        abstract opr =(self, other:T): Boolean
    end
    trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], AnyIntegral } comprises I

The same goes on `StandardPartialOrder`, `StandardMin`, `StandardMax`, `StandardMinMax` and `StandardTotalOrder` (`.fsi:167-219`). The compiler's own prelude already spells two of them that way: `trait Equality[\T\] comprises T` and `trait StandardTotalOrder[\T\] … comprises T` (`Library/CompilerAlgebra.fsi:16`, `:24`; present in the snapshot lineage by 2012-01-20, `712a2969a`). Not measured: whether `Integral`'s `comprises I` fits beside `AnyIntegral comprises { ZZ }` (`.fsi:409`), which already costs one "Invalid comprises clause" error.
