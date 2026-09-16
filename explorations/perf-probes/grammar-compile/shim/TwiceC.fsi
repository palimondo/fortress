(* TwiceC -- a copy of explorations/apl-probes/a02_twice_g.fsi under a name that
   cannot collide with anything already in the caches.  ZZ32 arithmetic only, so
   that the compiler's prelude (CompilerBuiltin + CompilerLibrary) has every name
   the expansion needs. *)
api TwiceC

import FortressSyntax.{Expression}

grammar TwiceG extends { Expression }
    Expr |:= twicec⦇ a:Expr ⦈ => <[ (a) + (a) ]>
end

end
