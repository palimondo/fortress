(* UseFnP -- UseFnC with every template wrapped in its own parentheses, which
   13-shim2-matrix.out showed is what the compiler's type checker needs.
   dblc : ledger row 270 -- a free identifier resolving at the USE SITE.
   lamc : ledger row 285 part one -- a typed lambda written whole in one template.
   apc  : ledger row 285 part two -- that lambda passed as a function value to a
          use-site function whose parameter is arrow-typed. *)
api UseFnP

import FortressSyntax.{Expression}

grammar UseFnPG extends { Expression }
    Expr |:= dblp⦇ a:Expr ⦈ => <[ (mydoublec(a)) ]>
           | lamp⦇ a:Expr ⦈ => <[ ((fn (w: ZZ32): ZZ32 => (a) + w)(10)) ]>
           | app⦇ a:Expr ⦈  => <[ (applytoc(fn (w: ZZ32): ZZ32 => (a) + w, 3)) ]>
end

end
