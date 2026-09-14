(* q09a -- q08 failed because the two ends of the name were in DIFFERENT
   templates: the preamble's fn (v, m) => … binders are plain identifiers of a
   template, so hygiene gensyms them (Transform.generateId), while the
   reference templates <[ (v) ]> are free names, which the hygiene environment
   leaves alone -- "Variable v is not defined" (q08_cell.out).  A gap is not
   renamed, which is why q06 worked; but the preamble's names cannot come from
   a gap, the use site never writes them.

   So let the FREE name resolve where free names are meant to resolve: at the
   use site.  The host declares each APL name once, as a cell; the grammar
   refers to it as a free identifier.  Same grammar as q08 without the
   preamble. *)
api q09a_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q09a extends { Expression, Literal, Identifier }
    Expr |:= qnine⦇ blk:Q09S ⦈ => <[ (blk) ]>

    Q09S :Expr:=
        s:Q09E SPACE ⋄ SPACE r:Q09S => <[ (fn _ => (r))(q09echo((s))) ]>
      | s:Q09E
        r:Q09S                      => <[ (fn _ => (r))(q09echo((s))) ]>
      | s:Q09E                      => <[ (s) ]>

    Q09E :Expr:=
        c:Q09N SPACE ← SPACE r:Q09E   => <[ q09put((c), (r)) ]>
      | c:Q09N ⌈ SPACE ← SPACE r:Q09E => <[ q09put((c), q09bump(q09val((c)), (r))) ]>
      | l:Q09A SPACE ⍴ SPACE r:Q09E   => <[ q09dy((l), (r)) ]>
      | a:Q09A                        => <[ (a) ]>

    Q09A :Expr:=
        c:Q09N        => <[ q09val((c)) ]>
      | x:LiteralExpr => <[ (x) ]>

    Q09N :Expr:=
        [v]# NOT [A:Za:z0:9] => <[ (v) ]>
      | [m]# NOT [A:Za:z0:9] => <[ (m) ]>
end

end
