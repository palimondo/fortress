(* q03 -- q02 located the wall exactly: the template parser tries AssignLeft
   (hence QualifiedName, hence NodeFactory.makeId(span, id, ids), hence
   id.getText()) on the FIRST token of every Expr it starts, and a gap's text
   is null, so the IllegalArgumentException aborts the whole template parse.
   The hypothesis this probe tests: an Id gap is fine as long as it is NOT the
   first token of an expression -- put an ordinary identifier in front of it
   (a juxtaposed identity function, q03ref) and the parse reaches it through
   MathItem -> VarOrFnRef -> Id, which never reads the text.

   If that holds, a sub-language gets BOTH halves: a name bound as a lambda
   parameter (q01) and a name read as q03ref n. *)
api q03_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q03a extends { Expression, Literal, Identifier }
    Expr |:= qref⦇ b:Q03S ⦈ => <[ (b) ]>

    Q03S :Expr:=
        n:Id SPACE ← SPACE e:Q03A ⋄ SPACE r:Q03S => <[ (fn n => (r))((e)) ]>
      | e:Q03A                                   => <[ (e) ]>

    Q03A :Expr:=
        n:Id          => <[ q03ref n ]>
      | x:LiteralExpr => <[ (x) ]>
end

end
