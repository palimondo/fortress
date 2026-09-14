(* p17 -- is "one production per bracket shape" forced, or merely convenient?
   m[1;2] has a ;-separated list of index expressions, one per axis, and rung 2's
   grammar writes one production for each shape it accepts.  The shipped
   Regex.fsi splices a REPEATED gap into an aggregate -- `[# r:RangeItem#* `]
   => <[ InverseClassElement(<|r**|>) … ]> (syntax_abstraction_tests/
   Regex.fsi:129) -- so a list-valued index list should be reachable.  This
   probe tries exactly that, with the repetition carrying the axes before the
   last one. *)
api p17_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P17 extends { Expression, Literal }

    Expr |:= ixl⦇ e:Nx ⦈ => <[ (e) ]>

    Nx :Expr:=
        b:Num `[ SPACE xs:Sep* SPACE l:Num SPACE `] => <[ lst((b), <|[\ZZ32\] xs**, (l) |>) ]>

    Sep :Expr:= n:Num SPACE ; SPACE => <[ (n) ]>

    Num :Expr:= n:LiteralExpr => <[ (n) ]>
end

end
