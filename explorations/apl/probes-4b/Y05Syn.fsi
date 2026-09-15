(* Y05Syn -- probes-4b's second throw-away grammar: the two TACIT patterns of
   the flat microGPT (Dyalog L16 and L25) written as grammar rules that expand
   to a TUPLE OF PRODUCTS over FlatArrays' juxtaposition and transpose.

       L16   Q K Vv←X1∘(+.×⍉)¨wq wk wv        is   (X1 ⍉wq, X1 ⍉wk, X1 ⍉wv)
       L25   gWQ gWK gWV←X1∘(+.×⍨⍉)¨dQ dK dV  is   (⍉dQ +.× X1, …)

   These are the two rules the focused base (../mg/DESIGN.md) writes instead of
   the universal base's `a∘g` bind, which makes an untyped function value.  Each
   rule writes the WHOLE derived function's body, so hygiene never has to carry
   a name across two templates (y02's answer), and nothing crosses a rule
   boundary but arrays.

   Every gap is a nonterminal of this sub-language -- a closed name set -- and
   never a host `Expr`: the separator that follows the left operand is `∘`,
   which is Fortress's RING/CIRC/COMPOSE (Literal.rats:403-405), so an `Expr`
   gap there would swallow it exactly as y01's `⋄` was swallowed.

   The question the expansion itself asks: is

       ((X1)) (transpose((wq)))

   -- two parenthesised expressions side by side, neither of them a function --
   the JUXTAPOSITION product?  The base never writes one; C4 writes `x1 wq^T`
   with bare names.  t3 and t4 are the same product written the two other ways
   a template could write it, as controls. *)
api Y05Syn

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Y05G extends { Expression, Literal, Identifier }

    (* L16's pattern: l∘(+.×⍉) applied to each of a three-name strand *)
    Expr |:= t5⦇ l:Y5Name ∘ ( `+ . × ⍉ ) ¨ a:Y5T SPACE b:Y5T SPACE c:Y5T ⦈
               => <[ (((l)) (transpose((a))), ((l)) (transpose((b))), ((l)) (transpose((c)))) ]>
           (* L25's pattern: the commuted train, ⍉w +.× l *)
           | t6⦇ l:Y5Name ∘ ( `+ . × ⍨ ⍉ ) ¨ a:Y5T SPACE b:Y5T SPACE c:Y5T ⦈
               => <[ ((transpose((a))) ((l)), (transpose((b))) ((l)), (transpose((c))) ((l))) ]>
           (* controls: the same single product spelled three ways *)
           | t7⦇ l:Y5Name ⍤ a:Y5T ⦈ => <[ ((l)) (transpose((a))) ]>
           | t8⦇ l:Y5Name ⍤ a:Y5T ⦈ => <[ (l) transpose((a)) ]>
           | t9⦇ l:Y5Name ⍤ a:Y5T ⦈ => <[ do lt = (l); rt = transpose((a)); lt rt end ]>

    (* the closed name sets, spelled as base/AplSyntax.fsi's are *)
    Y5Name :Expr:=
        [X]# [1]# NOT [A:Za:z0:9] => <[ (X1) ]>

    Y5T :Expr:=
        [w]# [q]# NOT [A:Za:z0:9]  => <[ (wq) ]>
      | [w]# [k]# NOT [A:Za:z0:9]  => <[ (wk) ]>
      | [w]# [v]# NOT [A:Za:z0:9]  => <[ (wv) ]>
      | [d]# [Q]# NOT [A:Za:z0:9]  => <[ (dQ) ]>
      | [d]# [K]# NOT [A:Za:z0:9]  => <[ (dK) ]>
      | [d]# [V]# NOT [A:Za:z0:9]  => <[ (dV) ]>
end

end
