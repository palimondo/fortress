(* UseFnC -- the two mechanisms the APL base leans on, in ZZ32 only.

   dblc  : ledger row 270 -- a free identifier in a <[ ]> template resolving at
           the USE SITE, i.e. naming a function declared in the using component.
   lamc  : ledger row 285, part one -- a TYPED LAMBDA written whole inside one
           template, binder and reference both, and applied.
   apc   : ledger row 285, part two -- the same template-written typed lambda
           passed as a FUNCTION VALUE to a use-site function whose parameter is
           arrow-typed. *)
api UseFnC

import FortressSyntax.{Expression}

grammar UseFnG extends { Expression }
    Expr |:= dblc⦇ a:Expr ⦈ => <[ mydoublec(a) ]>
           | lamc⦇ a:Expr ⦈ => <[ (fn (w: ZZ32): ZZ32 => (a) + w)(10) ]>
           | apc⦇ a:Expr ⦈  => <[ applytoc(fn (w: ZZ32): ZZ32 => (a) + w, 3) ]>
end

end
