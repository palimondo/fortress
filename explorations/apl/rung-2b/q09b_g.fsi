(* q09b -- the same idea with no cell object at all: the host declares the name
   as a Fortress var and the template expands to an ASSIGNMENT to it.  Gap row 8
   says a template cannot expand to an assignment, but that was measured with a
   GAP on the left of :=; here the left is a literal name of the template, and a
   literal is not a gap. *)
api q09b_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q09b extends { Expression, Literal, Identifier }
    Expr |:= qvar⦇ blk:Q09bS ⦈ => <[ (blk) ]>

    Q09bS :Expr:=
        s:Q09bE SPACE ⋄ SPACE r:Q09bS => <[ (fn _ => (r))(q09echo((s))) ]>
      | s:Q09bE                       => <[ (s) ]>

    Q09bE :Expr:=
        [v]# NOT [A:Za:z0:9] SPACE ← SPACE r:Q09bE => <[ do v := (r); v end ]>
      | [m]# NOT [A:Za:z0:9] SPACE ← SPACE r:Q09bE => <[ do m := (r); m end ]>
      | l:Q09bA SPACE ⍴ SPACE r:Q09bE              => <[ q09dy((l), (r)) ]>
      | a:Q09bA                                    => <[ (a) ]>

    Q09bA :Expr:=
        [v]# NOT [A:Za:z0:9] => <[ (v) ]>
      | [m]# NOT [A:Za:z0:9] => <[ (m) ]>
      | x:LiteralExpr        => <[ (x) ]>
end

end
