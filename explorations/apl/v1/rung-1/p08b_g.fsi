(* p08b -- the same grammar with one APL glyph (U+2373) added above the escape.
   The preparser cannot tokenise that glyph, gives up, and never reports the
   escape: fortress parse prints Ok.  The delimiter check is simply skipped
   from the glyph onward -- that is the price of the glyphs, and the reason
   AplSyntax.fsi keeps a glyph above its function table. *)
api p08b_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P08b extends { Expression, Literal }
    Expr |:= p8b⦇ f:P08bFn ⦈ => <[ (f) ]>

    P08bFn :Expr:=
        ⍳ => <[ "iota" ]>
      | `+ => <[ "plus" ]>
      | ×  => <[ "times" ]>
end

end
