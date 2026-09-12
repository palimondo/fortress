(* q04 -- q03 showed why a name cannot be READ through a gap: Transform's
   forVarRef (Transform.java:122-135) looks the VarRef's id up in the hygiene
   environment instead of recurring into it, so a TemplateGapId sitting in a
   VarRef is never substituted and reaches the disambiguator as an Id with a
   null apiName.

   The way round it, and the subject of this probe: the REFERENCE is not a gap
   at all.  A name is a TERMINAL of the sub-grammar whose template writes the
   same name as an ordinary Fortress identifier -- <[ v ]> -- which is a FREE
   name of the template and is therefore left alone (SyntaxEnvironment's
   identity environment returns an unbound id unchanged).  The BINDER stays
   generic: an Id gap bound as a lambda parameter is not gensymmed either
   (Transform.generateId returns the original for a TemplateGapId), so it is
   literally the name the use site wrote, and the two meet.

   Also under test here: ⋄ and a NEWLINE as statement separators (a line break
   between two symbols of a production becomes br, the Fortress parser's
   required line break -- Syntax.rats:238-242, Spacing.rats:98), and what a
   non-final expression statement should do with its value.

   The reference template is written PARENTHESISED, <[ (v) ]>: the bare
   spelling <[ v ]> -- a template that is one identifier and nothing else --
   is rejected by the template parser, "Could not parse 'v '" (q04_g.fsi.0,
   q04_name.out.0). *)
api q04_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q04a extends { Expression, Literal, Identifier }
    Expr |:= qnam⦇ b:Q04S ⦈ => <[ (b) ]>

    (* statements: ⋄-separated, newline-separated, or the last one *)
    Q04S :Expr:=
        n:Id SPACE ← SPACE e:Q04E SPACE ⋄ SPACE r:Q04S => <[ (fn n => (r))((e)) ]>
      | n:Id SPACE ← SPACE e:Q04E
        r:Q04S                                        => <[ (fn n => (r))((e)) ]>
      | e:Q04E SPACE ⋄ SPACE r:Q04S                   => <[ (fn _ => (r))(q04echo((e))) ]>
      | e:Q04E
        r:Q04S                                        => <[ (fn _ => (r))(q04echo((e))) ]>
      | e:Q04E                                        => <[ (e) ]>

    Q04E :Expr:=
        l:Q04A SPACE ⍴ SPACE r:Q04E => <[ q04dy((l), (r)) ]>
      | a:Q04A                      => <[ (a) ]>

    (* one alternative per name, each writing that name as a plain Fortress
       identifier; NOT [A:Za:z0:9] keeps v from matching the head of vx *)
    Q04A :Expr:=
        v NOT [A:Za:z0:9] => <[ (v) ]>
      | m NOT [A:Za:z0:9] => <[ (m) ]>
      | x:LiteralExpr     => <[ (x) ]>
end

end
