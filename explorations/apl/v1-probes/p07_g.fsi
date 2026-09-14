(* p07 -- APL's assignment arrow.  The book writes v ← 8 6 2 9, which binds a
   new name; a template cannot introduce a binding (an Id gap is not an
   expression, p03a), but Fortress's := is an expression, so the nearest
   reachable thing is assignment to an already-declared mutable variable named
   through the escape.  Does a template expand to an assignment whose target is
   an Expr gap?  First spelling parenthesised the target, (t) := (r), and the
   template parser rejected it with a Syntax Error at the := (p07_assign.out.0);
   the second left the target bare, the way For.fsi leaves its Id gap bare, and
   failed the same way (p07_assign.out.1).  This third spelling makes the target
   an Id gap -- a binder-like position, which is the one place For.fsi's Id gap
   does work -- and drops the value of the expander, since an Id gap cannot be
   the result expression either. *)
api p07_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar P07 extends { Expression, Literal, Identifier }
    Expr |:= asgn⦇ t:Id ← r:Expr ⦈ => <[ do t := (r) end ]>
end

end
