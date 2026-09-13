(* p02b -- p02 never got to run its f/ rule: the MacroError from the Id gap in
   the same grammar aborted the program before evaluation.  This file keeps
   only the two questions that can still be answered: is the whitespace in a
   production optional at the use site, and does one rule
   (f:AplFn / SPACE r:...) serve every function glyph, including U+233F for
   the first-axis reduction? *)
api p02b_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P02b extends { Expression, Literal }
    Expr |:= nospace⦇ a:LiteralExpr , b:LiteralExpr ⦈ => <[ (a) + (b) ]>
           | redop⦇ f:P02bFn / SPACE n:LiteralExpr ⦈  => <[ p02Red((f), "last", (n)) ]>
           | redfi⦇ f:P02bFn ⌿ SPACE n:LiteralExpr ⦈  => <[ p02Red((f), "first", (n)) ]>

    P02bFn :Expr:=
        ⍳ => <[ "iota" ]>
      | `+ => <[ "plus" ]>
      | `* => <[ "power" ]>
      | ×  => <[ "times" ]>
end

end
