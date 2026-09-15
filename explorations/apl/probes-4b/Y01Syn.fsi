(* Y01Syn -- probes-4b's throw-away grammar, in the shape of base/AplSyntax.fsi
   but carrying only the rules the two questions need.  It does NOT use the APL
   base: the probes that import it are on a source path of `.` + run-c4/src +
   the shipped libraries, so the only vocabulary the templates may name is
   FlatArrays' and the using component's own declarations.

   Question 1 -- a NAMED HOST FUNCTION written by a template.  Four rules, two
   shapes each: the name comes from a closed-name nonterminal spliced through a
   gap (y1, y2, as the base's AplFnName is used), and the name is written
   LITERALLY in the template (y3, y4, as ledger row 270's free identifiers are).
   The callee is FlatArrays' `rows`, which is overloaded on the ARROW TYPE of
   its first parameter (ledger row 171).

   Question 2 -- a TYPED LAMBDA written entirely inside one template.  bl writes
   the binder `w` and the reference `w` in the SAME template; bf and bg write
   the same lambda but pass it to `rows` as a function value, bf exactly as
   asked and bg with the lambda parenthesised, in case the comma of the argument
   list is eaten by the lambda body.  om is the NEGATIVE CONTROL that ledger row
   204 predicts: the binder is written by om's template and the reference by
   Ybody's, two different templates, so hygiene must gensym them apart.

   The one house rule this file has to obey: a backtick escape is read by the
   PREPARSER as an opening quote, so at least one APL glyph must stand ABOVE
   every escape -- the ⍤ of the first rule is above the two `_ of Yname2.

   And one house rule this file LEARNED (y01_named.out.0/.out.1): the separator
   between two Expr gaps must be a glyph that is NOT a Fortress operator.  ⋄ is
   Fortress's DIAMOND and ∘ its RING/COMPOSE (Literal.rats:403-405, :428), so
   a rule x:Expr ⋄ y:Expr lets the FIRST gap's Expr swallow the separator and the
   whole rule never matches.  ⍤ and the other APL glyphs are in no Fortress
   operator table, so they stop an Expr gap; every separator here is ⍤. *)
api Y01Syn

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Y01G extends { Expression, Literal, Identifier }

    Expr |:= y1⦇ f:Yname ⍤ r:Expr ⦈           => <[ rows((f), (r)) ]>
           | y2⦇ f:Yname2 ⍤ x:Expr ⍤ y:Expr ⦈ => <[ rows((f), (x), (y)) ]>
           | y3⦇ r:Expr ⦈                     => <[ rows(rmsn, (r)) ]>
           | y4⦇ x:Expr ⍤ y:Expr ⦈            => <[ rows(rmsn_b, (x), (y)) ]>
           | bl⦇ a:Expr ⍤ r:Expr ⦈
               => <[ (fn (w: Array[\RR64,(ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32)\] => (a) transpose(w))((r)) ]>
           | bf⦇ a:Expr ⍤ r:Expr ⦈
               => <[ rows(fn (w: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] => (a) + w, (r)) ]>
           | bg⦇ a:Expr ⍤ r:Expr ⦈
               => <[ rows((fn (w: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] => (a) + w), (r)) ]>
           | bs⦇ a:Expr ⍤ r:Expr ⦈
               => <[ rows(fn (w: Array[\RR64,ZZ32\]): RR64 => (a) + (SUM w), (r)) ]>
           | om⦇ b:Ybody ⍤ r:Expr ⦈
               => <[ (fn (w: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] => (b))((r)) ]>

    (* the negative control's other half: ⍵ expands, in ITS OWN template, to the
       identifier om's template used as the lambda's parameter *)
    Ybody :Expr:=
        ⍵ => <[ (w) ]>

    (* the closed name sets, spelled as base/AplSyntax.fsi's AplFnName is *)
    Yname :Expr:=
        [r]# [m]# [s]# [n]# NOT [A:Za:z0:9] => <[ (rmsn) ]>
      | [s]# [m]# NOT [A:Za:z0:9]           => <[ (sm) ]>

    Yname2 :Expr:=
        [r]# [m]# [s]# [n]# [`_]# [b]# NOT [A:Za:z0:9] => <[ (rmsn_b) ]>
      | [s]# [m]# [`_]# [b]# NOT [A:Za:z0:9]           => <[ (sm_b) ]>
end

end
