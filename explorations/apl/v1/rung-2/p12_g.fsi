(* p12 -- (second spelling: the nonterminal first called WE had to be renamed WEx, p12a)
    can a BARE IDENTIFIER be a terminal of a sub-grammar, and can APL's
   assignment arrow then be spelled as the book spells it?  Rung 1 established
   that an Id gap cannot be spliced into an expression position (gap row 4) and
   that no gap position exists left of := (gap row 8), so a host variable had to
   be named ⍎(v).  This probe takes the other road: do not splice an identifier,
   SPELL it -- a character class of letters, concatenated right-recursively into
   a String, exactly as the shipped Xml.fsi builds its attribute names
   (syntax_abstraction_tests/Xml.fsi:120-133) -- and then let the name be a
   lookup in a user-level workspace object (p11_ws.fss).  ← expands to a call,
   which gap row 8's p07d already proved reachable. *)
api p12_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P12 extends { Expression, Literal }

    Expr |:= w1⦇ e:WEx ⦈ => <[ (e) ]>

    WEx :Expr:=
        n:WId SPACE ← SPACE r:WEx => <[ wsSet((n), (r)) ]>
      | n:WId                    => <[ wsGet((n)) ]>
      | s:WStrand                => <[ (s) ]>

    WStrand :Expr:=
        n:WNum SPACE s:WStrand => <[ aplCat((n), (s)) ]>
      | n:WNum                 => <[ (n) ]>

    WNum :Expr:= n:LiteralExpr => <[ aplScalar(1.0 (n)) ]>

    (* the identifier, spelled one letter at a time; # forbids whitespace
       inside it, so "v w" is two identifiers and not one *)
    WId:String :Expr:=
        x:WCh# y:WId => <[ x y ]>
      | x:WCh        => <[ x "" ]>

    WCh:String :StringLiteralExpr:= x:[A:Za:z] => <[ "" x ]>
end

end
