# How the shipped library declares disjointness, and why its own array operators load

Read for route D (2026-09-19); every line is Library/FortressLibrary.fss unless marked.
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss has no `excludes` or `comprises` at all;
its numeric objects (`Float` :54, `FloatLiteral` :194, `RR32` :203, `Int` :369, `Long` :378,
`NN32` :387, `UnsignedLong` :450, `IntLiteral` :461, `BigNum` :528) are the leaves the
library's `comprises` clauses name.

Three patterns.

1. `excludes { ... }` between concrete unrelated families: `HasRank excludes { Number, AnyMaybe }`
   :1584 (so every Array, through ReadableArray :1802, excludes Number); the Potemkin ranks
   `Rank1/2/3 excludes { ..., Number, String }` :1596-1606 with the comment "Really we just want
   to say that Rank[\n\] excludes Rank[\m\] where { m =/= n }, but we can't yet"; `Array1/2/3
   excludes { Number, String }` :2096, :2292, :2666; `String`-side :958, :3956; exceptions
   :1452, :1530.  Spec: `basic/traits.tex:218-228` (symmetric, no trait may extend both).
2. A placeholder trait so that a GENERIC family can be excluded without where clauses:
   `trait AnyMultiplicativeRing end` :335-336 ("Place holder for exclusions of
   MultiplicativeRing"), extended by `MultiplicativeRing[\T\]` :340, excluded by `Vector` :2191
   and `Matrix` :2499; the same for `AnyMaybe` :1290-1292 and `AnyUniqueItem` :1367-1369 ("This
   makes excludes work without where clauses"); `AnyIntegral` :609 and `AnyMatrix` :2495 are the
   same shape used for comprises and for dispatch.
3. Closed `comprises` chains on the numeric tower: `Number comprises { RR64 }` :352-354,
   `RR64 comprises { Float, FloatLiteral, RR32, QQ }` :422, `QQ comprises { Ratio, AnyIntegral }`
   :521, `ZZ64 comprises { Long, ZZ32 }` :700, `ZZ32 comprises { Int, IntLiteral }` :642,
   `NN64 comprises { UnsignedLong, NN32 }` :770, `ZZ comprises { BigNum, ZZ64, NN64 }` :822-823.
   The one open link is `trait AnyIntegral extends { QQ } end` :609 (its immediate extender is
   the generic `Integral[\I\]` :611, which a comprises clause cannot name without a where
   clause, spec `basic/traits.tex:232-235`; the api at .fsi:370 leaves `QQ comprises { ... }`
   open for the same reason).

Why the ZZ32 scalar block (:4493-4517) loads beside `AdditiveGroup.+` :330 and
`StandardTotalOrder.MAX` :280, and D4's RR64 copy of it does not: the interpreter's
exclusion test (`FType.excludesOtherInner`, FType.java:229-297) treats a trait with a
`comprises` clause as excluding another type when EVERY leaf of its transitive comprises
excludes it (:281-297, `FTypeTrait.computeTransitiveComprises` :68-78), and an object leaf
excludes any type not among its supertypes (:236-245).  ZZ32's leaves are the objects `Int`
and `IntLiteral`, so ZZ32 excludes the library's `T` (whose bound `AdditiveGroup[\T\]` is a
symbolic instance no object lists; `SymbolicType.java:59-80` routes a type variable through
its bound).  RR64's leaves include `AnyIntegral`, a trait without comprises, which excludes
nothing, so RR64 excludes nothing by comprises.  Measured: probes Z1 (ZZ32 pair green), R1
(RR64 pair refused), R1c (RR64 pair green once `AnyIntegral comprises { ZZ }`).

The library's own ground block is nevertheless a blocker for any second user declaration of
`+ - MIN MAX` over another element type (Ac, PplusN2c: refused against :4511/:4493), since
two instantiations of `Array` are neither ordered nor excluding (row 97) and ZZ32 <: RR64.
