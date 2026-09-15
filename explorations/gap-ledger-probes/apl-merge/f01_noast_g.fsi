(* Row 271: an api that gives one of its own nonterminals an AST type must
   import FortressAst.{...}.  This is apl-probes/b06c_repeat_g.fsi with that
   one import removed and nothing else changed; b06c_repeat_g.fsi runs. *)
api f01_noast_g
import FortressSyntax.{Expression, Literal}
grammar RepN extends { Expression, Literal }
    Expr |:= sumn⦇ n1:NumN ns:MoreN* ⦈ => <[ sumOfN(<|[\ZZ32\] (n1), ns** |>) ]>
    NumN :Expr:= n:LiteralExpr => <[ (n) ]>
    MoreN :Expr:= SPACE n:NumN => <[ (n) ]>
end
end
