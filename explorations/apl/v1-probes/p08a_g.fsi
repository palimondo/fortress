(* p08a -- an escaped + in a grammar, with no APL glyph anywhere above it.  The
   preparser reads the backtick as an opening quote that wants a closing ' and,
   reaching the end of the file without one, rejects the api.  fortress parse
   p08a_g.fsi is the whole probe; the same errors abort a run. *)
api p08a_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P08a extends { Expression, Literal }
    Expr |:= p8a⦇ f:P08aFn ⦈ => <[ (f) ]>

    P08aFn :Expr:=
        `+ => <[ "plus" ]>
      | ×  => <[ "times" ]>
end

end
