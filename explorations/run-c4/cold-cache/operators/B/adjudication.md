# Route B: does the specification permit C4's two `+` beside `AdditiveGroup.+`?

No. Two sentences refuse them independently; the unadjudicated question (whose `T` a
functional method's is) does not change the verdict under either reading.

1. `Specification/basic/overloading.tex:100-105` (restated `advanced/overloading.tex:96-97`):
   "it is an error for their static parameters to differ (up to α-equivalence), or for
   one declaration to have static parameters and another to not have them."
   C4's `+[\I\]` (`FlatArrays.fss:24`) and `+[\nat r, nat c, nat a, nat b, nat d\]` (`:134`)
   already differ from each other. Against `AdditiveGroup[\T\].+(self, other: T)`
   (`FortressLibrary.fss:330`): if the method has no static parameters of its own, C4's
   have some and it has none; if it carries the trait's (`basic/traits.tex:487-495` views a
   functional method as a top-level function, which must then bind `T` as
   `[\T extends AdditiveGroup[\T\]\]`), `[\I\]` is not α-equivalent to it. Refused either way.

2. `advanced/overloading.tex:443-447` sends a functional-method/function pair to the Meet
   Rule for functions (`:247-262`), after the Subtype Rule (`:151-156`) and the
   Incompatibility Rule (`:170-198`): `(Array[\RR64,I\], RR64)` against
   `(AdditiveGroup[\T\], T)`: neither tuple is a subtype of the other; no position excludes
   (`Vector` extends both `Array1` and `AdditiveGroup`, `FortressLibrary.fss:2189-2191`, and
   `RR64` is an `AdditiveGroup` through `Number`, `:352-354`); no `+` on the meet is
   declared. The same letter refuses the library's own `opr +(x: Array[\ZZ32,ZZ32\], y: ZZ32)`
   (`:4493`), as the review already noted.

Route B is closed. For the record, what the interpreter does instead of the letter
(`OverloadedFunction.java:434-500`): it does not implement the static-parameter sentence at
all (C4's four `rows` overloads with four different `nat` lists load); it accepts a pair when
some position *excludes* (`:434`), where exclusion of a type variable goes through its bound
(`SymbolicType.java:59-80`) and exclusion of a trait with a `comprises` clause holds when
every leaf of the transitive `comprises` excludes the other (`FType.java:281-297`,
`FTypeTrait.java:68-78`); a symbolic position that neither excludes nor orders refuses
(`:451-454`, `:498-500`). That is why `ZZ32` (closed: `Int`, `IntLiteral`, `:642`) passes where
`RR64` (open at `AnyIntegral`, `:609`) does not -- route D's finding, not a route B repair.
No edit to the check is sketched: the specification refuses the declarations.
