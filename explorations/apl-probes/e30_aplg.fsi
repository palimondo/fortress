(* E -- the grammar half.  A sub-language apl<( ... )> whose terminals are APL
   glyphs the main Fortress lexer does not know, parsed right to left with
   strand notation, monadic/dyadic primitives and +/ reduce, desugaring to the
   library calls of d20_apl. *)
api e30_aplg

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar Apl extends { Expression, Literal }

    (* the expander: one new Expr form *)
    Expr |:= apl⦇ e:AplE ⦈ => <[ (e) ]>

    (* APL evaluation order: no precedence, strictly right to left.  The left
       argument of a dyadic function is a strand; its right argument is the
       whole rest of the line. *)
    AplE :Expr:=
        l:AplStrand SPACE f:AplDy SPACE r:AplE => <[ aplDy((f), (l), (r)) ]>
      | f:AplMon SPACE r:AplE                  => <[ aplMon((f), (r)) ]>
      | s:AplStrand                            => <[ (s) ]>

    (* strand notation: 1 2 3 is one vector, not three juxtaposed numbers *)
    AplStrand :Expr:=
        n:AplNum SPACE s:AplStrand => <[ aplCat(aplScalar((n)), (s)) ]>
      | n:AplNum                   => <[ aplScalar((n)) ]>

    AplNum :Expr:= n:LiteralExpr => <[ 1.0 (n) ]>

    AplDy :Expr:=
        `+ => <[ "plus" ]>
      | -  => <[ "minus" ]>
      | ×  => <[ "times" ]>
      | ÷  => <[ "divide" ]>
      | ⌈  => <[ "max" ]>
      | ⌊  => <[ "min" ]>
      | ⍴  => <[ "reshape" ]>
      | ,  => <[ "catenate" ]>

    AplMon :Expr:=
        `+/ => <[ "plusreduce" ]>
      | ⍳  => <[ "iota" ]>
      | ⍴  => <[ "shape" ]>
      | ⌽  => <[ "reverse" ]>
      | ⍉  => <[ "transpose" ]>
      | -  => <[ "negate" ]>
      | ⌈  => <[ "ceilingish" ]>
end

end
