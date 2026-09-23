(* flat-tower-sketch.fsi -- price-keep-the-rule.md, item 1.  NOT a compilable api: an excerpt
   of Library/FortressLibrary.fsi (and one line of FortressBuiltin.fsi) rewritten in the shape
   of the compiler prelude (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:506-1000), so
   that no type is a subtype of two instantiations of one generic.  14 headers change: the 12
   declarations that ADD a second instantiation (all of the 23 with errors except Maybe, whose
   errors go with AnyMaybe's fix, and the 10 objects that only inherit one: Int, Long,
   UnsignedLong, IntLiteral, BigNum, LessThan, GreaterThan, EqualTo, Just, Nothing), plus Number
   and RR64, which give up and take the algebra.  make-flat-lib.py applies exactly these headers to copies for the
   checker count (item 5).  "(was ...)" gives today's header.

   The rules the sketch follows:
   1. No self-typed trait (Equality, StandardPartialOrder, StandardMin/Max/MinMax,
      StandardTotalOrder, Integral, AdditiveGroup, MultiplicativeRing) above a leaf.  The
      algebra sits on the leaves only, as in the prelude; Number carries only the two
      non-generic markers, which keeps every array's `excludes AnyMultiplicativeRing` and
      Array3's `excludes AnyAdditiveGroup` true of every number.
   2. Siblings exclude each other; each leaf `comprises` only its objects.
   3. Widening is a `coerce` on the wider type (the prelude's :514-518, :575-576, :816-817,
      :928-929), plus the integer-to-float coercions the specification describes
      (conversions-coercions.tex:60-66) and the prelude never wrote.
   4. Number keeps no operator: a catch-all such as today's `opr +(self, b:Number): RR64`
      applies without coercion to every mixed call, so a coercion would never be chosen
      (conversions-coercions.tex:454-458: coercion is tried only when no declaration applies
      without it), and its RR64 result breaks the return type rule against a leaf's `+`
      once ZZ32 is no longer below RR64. *)

trait Number                                   (* was: extends { StandardPartialOrder[\Number\],
                                                  StandardMinMax[\Number\], AdditiveGroup[\Number\],
                                                  MultiplicativeRing[\Number\] } comprises { RR64 } *)
        extends { AnyAdditiveGroup, AnyMultiplicativeRing }
    (* the 50 operator and function declarations of today's Number go: the arithmetic and
       comparisons to each leaf (they are there already, on every leaf but RR64, which gets
       its own from the algebra traits), the functions (sin, log, floor, ...) to RR64 alone,
       reached from an integer by RR64's coercions below.  asFloat(self): RR64 stays in the
       component, non-generic. *)
end

trait RR64                                     (* was: extends Number comprises { Float, FloatLiteral, RR32, QQ } *)
        extends { Number, StandardPartialOrder[\RR64\], StandardMinMax[\RR64\],
                  AdditiveGroup[\RR64\], MultiplicativeRing[\RR64\] }
        excludes { QQ, AnyIntegral }
        comprises { Float, FloatLiteral, RR32 }    (* RR32 stays below RR64: it adds no instantiation *)
    coerce(x: QQ)
    coerce(x: ZZ)
    coerce(x: ZZ64)
    coerce(x: ZZ32)
    coerce(x: NN64)
    coerce(x: NN32)
    (* today's RR64 getters, plus Number's functions: sin, cos, ..., floor(self): RR64, ... *)
end

trait QQ                                       (* was: extends { RR64, StandardPartialOrder[\QQ\] }
                                                  comprises { AnyIntegral, ... } *)
        extends { Number, StandardPartialOrder[\QQ\], StandardMinMax[\QQ\],
                  AdditiveGroup[\QQ\], MultiplicativeRing[\QQ\] }
        excludes { AnyIntegral }
        comprises { ... }                      (* the component: comprises { Ratio } *)
    coerce(x: ZZ)
    coerce(x: ZZ64)
    coerce(x: ZZ32)
    coerce(x: NN64)
    coerce(x: NN32)
    (* today's QQ methods unchanged.  An integer is no longer a QQ, so ZZ's `/` returns
       Ratio(a, 1) where it returns `a` today (FortressLibrary.fss:860), and the QQ methods an
       integer inherits today (floor, ceiling, truncate, MINNUM, MAXNUM, isFinite, ...) are
       restated on Integral[\I\]. *)
end

trait AnyIntegral                              (* was: extends { QQ } comprises { ZZ } *)
        extends { Number }
        comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }
    (* now closed and well formed: its immediate subtypes are the five leaves, which extend it
       directly; the family E error at .fsi:409-411 and the NOT YET comment go, and the checker
       accommodation of POSITIONS 2026-09-21 (`isEligibleToExtend`) is no longer needed. *)
end

trait Integral[\I extends Integral[\I\]\]     (* was: extends { StandardTotalOrder[\I\], AnyIntegral } *)
        extends { StandardTotalOrder[\I\], AdditiveGroup[\I\] }
    (* the 23 declarations of today unchanged, plus, generically once for all five leaves,
       what a leaf inherits today from ZZ, QQ, RR64 and Number: numerator, floor, ceiling,
       truncate, isFinite, isNumber, odd, even, ... (the measured list is in the note, § 2). *)
end

trait ZZ                                       (* was: extends { Integral[\ZZ\] } comprises { BigNum, ZZ64, NN64 } *)
        extends { AnyIntegral, Integral[\ZZ\] }
        excludes { NN64, NN32 }
        comprises { BigNum }
    coerce(x: ZZ32)
    coerce(x: ZZ64)
    coerce(x: NN32)
    coerce(x: NN64)
    (* today's methods unchanged *)
end

trait ZZ64                                     (* was: extends { ZZ, Integral[\ZZ64\] } comprises { Long, ZZ32 } *)
        extends { AnyIntegral, Integral[\ZZ64\] }
        excludes { ZZ, NN64, NN32 }
        comprises { Long }
    coerce(x: ZZ32)
    (* today's methods unchanged; its "Argh! ... these definitions must be given explicitly"
       comparisons (FortressLibrary.fss:716-722) stay, now for a different reason *)
end

trait ZZ32                                     (* was: extends { ZZ64, Integral[\ZZ32\] } comprises { Int, IntLiteral } *)
        extends { AnyIntegral, Integral[\ZZ32\] }
        excludes { ZZ64, ZZ, NN64, NN32 }
        comprises { Int, IntLiteral }
    (* today's methods, plus what it inherits today from ZZ64: >, >=, <=, CMP, narrow, big *)
end

trait NN64                                     (* was: extends { ZZ, Integral[\NN64\] } comprises { UnsignedLong, NN32 } *)
        extends { AnyIntegral, Integral[\NN64\] }
        excludes { ZZ, NN32 }
        comprises { UnsignedLong }
    coerce(x: NN32)
end

(* FortressBuiltin.fsi:82 *)
value object NN32                              (* was: extends { StandardTotalOrder[\NN32\], NN64 } *)
        extends { AnyIntegral, Integral[\NN32\] }

(* The three non-numeric groups, in the prelude's shape where it has one: *)
trait TotalComparison                          (* CompilerBuiltin.fss:1521-1523: the self-typed parent commented out *)
        extends { Comparison }                 (* was: { Comparison, StandardTotalOrder[\TotalComparison\] } *)
        comprises { LessThan, EqualTo, GreaterThan }
    (* MIN, MAX, MINMAX, <=, >= written out, as the prelude's Comparison does ("This ought
       to be provided by StandardPartialOrder[\Comparison\]", CompilerBuiltin.fss:1500) *)
end

value trait AnyMaybe extends { AnyUniqueItem } excludes Number
                                               (* was: extends { Equality[\AnyMaybe\], AnyUniqueItem };
                                                  its own opr = stays *)

object SumReduction extends { CommutativeMonoidReduction[\Number\] }
                                               (* was: + DistributesOver[\MaxReductionN\],
                                                  DistributesOver[\MinReductionN\]; the markers are
                                                  read nowhere (Generator2.fss:59-70 is commented out);
                                                  distributivity is the distribute(r) methods *)
object ProdReduction extends { CommutativeMonoidReduction[\Number\] }
                                               (* was: + DistributesOver[\SumReduction\], [\MinReductionN\],
                                                  [\MaxReductionN\] *)
