(* p09 -- the chapter's input lines often end in an APL comment, as in
   ⍬≡⍴5 ⍝ Does zilde match shape of 5?.  Can the sublanguage swallow one, so
   that a line of the book can be copied in verbatim?  A bare _* would eat the
   closing bracket of the expander too, so the first spelling used the PEG
   idiom inside a group, { NOT ⦈ _ }*, and the generated parser then ran to the
   end of the FILE: the expander never closed and the use site died with a
   Syntax Error at EOF (p09_comment.out.0).  This spelling drops the group and
   the repetition: a right-recursive nonterminal applies the NOT predicate one
   character at a time. *)
api p09_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal}

grammar P09 extends { Expression, Literal }
    Expr |:= cmt⦇ n:LiteralExpr SPACE ⍝ t:P09Tail ⦈ => <[ (n) ]>
           | cmt⦇ n:LiteralExpr ⦈                   => <[ (n) ]>

    P09Tail :Expr:=
        NOT ⦈ _ t:P09Tail => <[ 0 ]>
      | NOT ⦈ _           => <[ 0 ]>
end

end
