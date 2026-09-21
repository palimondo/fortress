api pNatExp
(* Decision F question 2 of explorations/reviews/array-design-review.md, and
   the export checker's equalIntExprs (ExportChecker.scala:645-648, "Not
   implemented!", = false in the tree).

   mk and len are declared identically here and in the component: their types
   carry a nat static argument, so the export check compares two IntArgs.

   opr DOT carries a DEAD nat m that the component does not declare -- the
   shape of Library/FortressLibrary.fsi:1511-1527 against .fss:2264-2280,
   which declares the same six operators with `nat n` alone. *)
trait Vec[\T, nat s\] extends Object end
mk[\T, nat s\](x: T): Vec[\T,s\]
len[\T, nat s\](v: Vec[\T,s\]): ZZ32
opr DOT[\T, nat n, nat m\](a: Vec[\T,n\], b: Vec[\T,n\]): ZZ32
end
