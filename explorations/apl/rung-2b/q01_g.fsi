(* q01 -- the foundation of rung 2b: does an Id gap bound as a LAMBDA PARAMETER
   work in a grammar of ours, as it does in the shipped For.fsi
   (syntax_abstraction_tests/For.fsi:22, i:Id <- e:Expr d:doFront =>
   <[ ((e).loop(fn i => d)) ]>)?  And is the name then visible to ordinary
   Fortress code in the body?

   Here the body is a HOST Expr gap, so this probe answers the binder question
   alone, without needing the sub-language to build a reference (q02).  The
   right-hand side is a sub-nonterminal and not a host Expr gap so that the
   greedy-Expr-gap problem (gap row 5) cannot confuse the ⋄ that follows it. *)
api q01_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q01a extends { Expression, Literal, Identifier }
    Expr |:= qbind⦇ n:Id SPACE ← SPACE e:Q01Num ⋄ SPACE b:Expr ⦈
                 => <[ (fn n => b)((e)) ]>

    Q01Num :Expr:= n:LiteralExpr => <[ (n) ]>
end

end
