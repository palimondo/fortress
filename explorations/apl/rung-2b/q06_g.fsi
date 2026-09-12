(* q06 -- the whole design, once q05 had explained q04's rejection.

   q05 showed the four name spellings all parse as templates on their own, so
   what killed q04 was not the template but the PRODUCTION: a terminal that is
   a valid identifier becomes a KeywordSymbol (ItemDisambiguator.java:109-141),
   every keyword of a user grammar is added to FORTRESS_KEYWORDS
   (ParserMaker.java:296-316), and Id excludes keywords -- so writing v as a
   terminal to recognise the name makes v unreadable as a name everywhere,
   templates included.  Spelling the terminal as a CHARACTER CLASS, [v], makes
   it a CharacterClassSymbol instead, and nothing becomes a keyword.

   So: the binder is a generic Id gap used as a lambda parameter (q01); the
   reference is one alternative per name, a character class whose template
   writes that name as an ordinary free identifier, which the hygiene
   environment leaves alone (SyntaxEnvironment.identityEnvironment returns an
   unbound id unchanged).  Both ends are then literally the name the use site
   wrote, so they meet.

   Also under test: ⋄ and a newline as statement separators -- a line break
   between two symbols of a production becomes br, the Fortress parser's
   REQUIRED line break (Syntax.rats:233-242, Spacing.rats:98) -- and echoing
   the value of a non-final statement, as an APL session does. *)
api q06_g

import FortressAst.{...}
import FortressSyntax.{Expression, Literal, Identifier}

grammar Q06a extends { Expression, Literal, Identifier }
    Expr |:= qsix⦇ b:Q06S ⦈ => <[ (b) ]>

    Q06S :Expr:=
        n:Id SPACE ← SPACE e:Q06E SPACE ⋄ SPACE r:Q06S => <[ (fn n => (r))((e)) ]>
      | n:Id SPACE ← SPACE e:Q06E
        r:Q06S                                        => <[ (fn n => (r))((e)) ]>
      | e:Q06E SPACE ⋄ SPACE r:Q06S                   => <[ (fn _ => (r))(q06echo((e))) ]>
      | e:Q06E
        r:Q06S                                        => <[ (fn _ => (r))(q06echo((e))) ]>
      | e:Q06E                                        => <[ (e) ]>

    Q06E :Expr:=
        l:Q06A SPACE ⍴ SPACE r:Q06E => <[ q06dy((l), (r)) ]>
      | a:Q06A                      => <[ (a) ]>

    (* one alternative per name; # glues the NOT predicate to the class so that
       the name ends where it ends *)
    Q06A :Expr:=
        [v]# NOT [A:Za:z0:9] => <[ (v) ]>
      | [m]# NOT [A:Za:z0:9] => <[ (m) ]>
      | x:LiteralExpr        => <[ (x) ]>
end

end
