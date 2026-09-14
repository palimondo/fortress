(* p03c -- p03b showed that an Expr gap followed by a host-known operator
   (U+2261) makes the whole expander unparsable: the Expr gap swallows the
   operator and Rats does not re-enter a nonterminal for a shorter match.
   Does an explicit escape glyph before each Expr gap (U+234E, APL's execute)
   rescue it?  If so, APL inside the expander can name Fortress variables. *)
api p03c_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P03c extends { Expression, Literal }
    Expr |:= escA⦇ ⍎ a:Expr ⍴ ⍎ b:Expr ⦈ => <[ p03pair((a), (b)) ]>
           | escB⦇ ⍎ a:Expr ≡ ⍎ b:Expr ⦈ => <[ p03pair((a), (b)) ]>
end

end
